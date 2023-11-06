import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const START_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const MAX = 2;
const TOKEN = '0c320283-6f34-42d0-ac1d-e3390049fe65';

function useAddress({ billingType, orgId = '', preSelectedAddress = {}, setSelectedAddress }) {
	const [addressData, setAddressData] = useState({
		allAddress  : [],
		mainAddress : [],
	});

	const [{ loading, data: addressList }, trigger] = useRequest({
		method  : 'get',
		url     : 'https://api-meteora1.dev.cogoport.io/list_address_for_insurance',
		token   : TOKEN,
		scope   : 'micro_service',
		scopeId : '0c320283-6f34-42d0-ac1d-e3390049fe65',
	}, { manual: true });

	const getBillingAddress = async () => {
		try {
			const resp = await trigger({
				params: {
					billing_type    : upperCase(billingType),
					organization_id : orgId,
				},
			});
			const { data } = resp || {};
			setAddressData({
				mainAddress : data.slice(START_INDEX, MAX),
				allAddress  : data,
			});
		} catch (error) {
			if (error?.code !== 'ERR_CANCELED') Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		if (orgId) {
			getBillingAddress();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgId]);

	useEffect(() => {
		if (!isEmpty(preSelectedAddress) && !isEmpty(addressList)) {
			setSelectedAddress(preSelectedAddress);
			const selectedAddIndex = addressList.findIndex((ele) => ele?.id === preSelectedAddress?.id);
			const firstAddress = addressList[GLOBAL_CONSTANTS.zeroth_index];

			addressList[selectedAddIndex] = firstAddress;
			addressList[GLOBAL_CONSTANTS.zeroth_index] = preSelectedAddress;

			setAddressData({
				mainAddress : addressList.slice(START_INDEX, MAX),
				allAddress  : addressList,
			});
		}
	}, [addressList, preSelectedAddress, setSelectedAddress]);

	return {
		addressData, loading, setAddressData, getBillingAddress,
	};
}

export default useAddress;

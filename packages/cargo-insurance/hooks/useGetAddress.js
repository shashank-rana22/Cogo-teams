import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { upperCase, isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const START_INDEX = 0;
const MAX = 2;

function useAddress({ billingType, orgId = '', preSelectedAddress = {}, setSelectedAddress }) {
	const [addressData, setAddressData] = useState({
		allAddress  : [],
		mainAddress : [],
	});

	const [{ loading, data: addressList }, trigger] = useRequest({
		method : 'get',
		url    : '/list_address_for_insurance',
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
	}, [billingType, orgId]);

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

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const START_INDEX = 0;
const MAX = 2;

function useAddress({ billingType, orgId = '' }) {
	const [addressData, setAddressData] = useState({
		remainingAddress : [],
		mainAddress      : [],
	});

	const [{ loading }, trigger] = useRequest({
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
				mainAddress      : data.slice(START_INDEX, MAX),
				remainingAddress : data.slice(MAX),
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		if (orgId) {
			getBillingAddress();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billingType, orgId]);

	return {
		addressData, loading, setAddressData,
	};
}

export default useAddress;

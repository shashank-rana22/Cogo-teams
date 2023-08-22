import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFuelPayment = ({ shipment_data = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_ftl_freight_fuel_payment',
		method : 'GET',
	}, { manual: true });

	const getFuelPayment = useCallback(async () => {
		try {
			trigger({
				params: {
					shipment_id: shipment_data?.id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something went wrong');
		}
	}, [shipment_data, trigger]);

	useEffect(() => {
		getFuelPayment();
	}, [getFuelPayment]);

	return {
		loading,
		data,
		getFuelPayment,
	};
};

export default useGetFuelPayment;

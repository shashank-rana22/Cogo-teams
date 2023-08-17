import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetKamCustomerShipmentInsights = ({ shipmentId }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_transaction_insights',
	}, { manual: true });

	const listKamCustomerInsights = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentId,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, shipmentId]);
	useEffect(() => {
		listKamCustomerInsights();
	}, [listKamCustomerInsights]);
	return {
		data,
		loading,
	};
};

export default useGetKamCustomerShipmentInsights;

import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetKamCustomerShipmentInsights = ({ shipmentId }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_transaction_insights',
	}, { manual: false });

	const listKamCustomerInsights = async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentId,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		listKamCustomerInsights();
	}, []);
	return {
		data,
		loading,
	};
};

export default useGetKamCustomerShipmentInsights;

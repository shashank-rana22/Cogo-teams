import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetShipmentQuotation = ({ shipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_quotation',
	}, { manual: true });

	const shipmentId = shipmentData?.id;

	const getQuotation = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id        : shipmentId,
					preferred_currency : 'USD',
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, shipmentId]);
	useEffect(() => {
		getQuotation();
	}, [getQuotation]);

	return {
		data,
		loading,
	};
};

export default useGetShipmentQuotation;

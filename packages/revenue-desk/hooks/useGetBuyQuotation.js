import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetBuyQuotation = ({ shipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_services_quotation',
	}, { manual: true });
	const shipmentId = shipmentData?.id;
	const getBuyQuotation = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentId,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [shipmentId, trigger]);
	useEffect(() => {
		getBuyQuotation();
	}, [getBuyQuotation]);
	return {
		data,
		loading,
	};
};

export default useGetBuyQuotation;

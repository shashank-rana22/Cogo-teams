import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetShipmentTimeLine = (shipmentId) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/shipment/get_service_timeline',
			method : 'get',
		},
	);

	const apiTrigger = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [shipmentId, trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data,
	};
};

export default useGetShipmentTimeLine;

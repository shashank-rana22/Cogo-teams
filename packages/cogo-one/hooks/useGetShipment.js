import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipment({ shipmentId = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/get_shipment',
		service_name : 'shipment',
		method       : 'GET',
	}, { manual: true });
	// (shipmentPopover?.id !== id)
	const getShipment = useCallback(() => {
		if (!shipmentId) {
			return;
		}

		try {
			trigger({
				params: {
					id: shipmentId,
				},
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [shipmentId, trigger]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {
		loading,
		data,
	};
}

export default useGetShipment;

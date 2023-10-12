import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipment({ shipmentId = '', shipmentPopover = {}, id = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/get_shipment',
		service_name : 'shipment',
		method       : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		if (!shipmentId || (shipmentPopover?.id !== id)) {
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
	}, [shipmentId, shipmentPopover?.id, id, trigger]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {
		loading,
		data,
	};
}

export default useGetShipment;

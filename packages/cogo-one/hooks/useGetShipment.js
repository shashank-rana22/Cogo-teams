import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipment({
	shipmentId = '',
	shipmentPopover = {},
	id = '',
}) {
	const { id: cardId = '' } = shipmentPopover || {};

	const [{ loading, data }, trigger] = useRequest({
		url          : '/get_shipment',
		service_name : 'shipment',
		method       : 'GET',
	}, { manual: true });

	const getShipment = useCallback(async () => {
		try {
			await trigger({
				params: {
					id: shipmentId,
				},
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [shipmentId, trigger]);

	useEffect(
		() => {
			if (!shipmentId || (cardId !== id)) {
				return;
			}
			getShipment();
		},
		[cardId, getShipment, id, shipmentId],
	);

	return {
		loading,
		data: loading ? {} : data,
		getShipment,
	};
}

export default useGetShipment;

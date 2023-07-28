import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetShipmentTimeLine({ item }) {
	const { id } = item || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_container_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getShipmentTimeline = useCallback(() => {
		try {
			trigger({
				params: {
					shipment_id: id,
				},
			});
		} catch (e) {
			Toast.error(e.message);
		}
	}, [id, trigger]);

	return {

		shipmentTimelineLoading : loading,
		shipmentTimelineData    : data,
		getShipmentTimeline,
	};
}

export default useGetShipmentTimeLine;

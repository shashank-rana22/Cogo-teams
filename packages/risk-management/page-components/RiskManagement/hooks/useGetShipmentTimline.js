import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetShipmentTimeLine({ itemData }) {
	const { id } = itemData || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_container_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getParams = useCallback(() => ({
		shipment_id: id,
	}), [id]);

	const getShipmentTimeline = useCallback((() => {
		const paramsData = getParams();
		try {
			trigger({
				params: paramsData,
			});
		} catch (e) {
			Toast.error(e.message);
		}
	}), [trigger, getParams]);

	return {

		shipmentTimelineLoading : loading,
		shipmentTimelineData    : data,
		getShipmentTimeline,
	};
}

export default useGetShipmentTimeLine;

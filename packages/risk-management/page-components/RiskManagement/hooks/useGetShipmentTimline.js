import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetShipmentTimeLine({ itemData }) {
	const { id } = itemData || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getShipmentTimeline = useCallback((async () => {
		try {
			await trigger({
				params: { 
					shipment_id: id ,
					container_timeline:true
				},
			});
		} catch (e) {
			Toast.error(e.message);
		}
	}), [id, trigger]);

	return {

		shipmentTimelineLoading : loading,
		shipmentTimelineData    : data,
		getShipmentTimeline,
	};
}

export default useGetShipmentTimeLine;

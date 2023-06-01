import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useState, useCallback } from 'react';

function useGetTimeLine({ shipment_data = {} }) {
	const [data, setData] = useState([]);
	const { id: shipment_id } = shipment_data || {};

	const [{ loading }, trigger] = useRequest({
		url          : 'get_service_timeline',
		service_name : 'shipment',
		method       : 'GET',
	}, { manual: true });

	const getShipmentTimeline = useCallback((async () => {
		try {
			const res = await trigger({
				params: { shipment_id },
			});

			setData(res.data);
		} catch (e) {
			setData([]);

			toastApiError(e);
		}
	}), [shipment_id, trigger]);

	return {
		getTimeline: {
			timelineLoading : loading,
			timelineData    : data || [],
			getShipmentTimeline,
		},
	};
}

export default useGetTimeLine;

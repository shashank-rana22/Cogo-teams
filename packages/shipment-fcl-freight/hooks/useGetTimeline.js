import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetTimeLine({ shipment_data = {} }) {
	const [data, setData] = useState([]);
	const { id: shipment_id } = shipment_data;

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/get_timeline',
		method : 'GET',
	}, { manual: true });

	const getShipmentTimeline = useCallback((async () => {
		try {
			const res = await trigger({
				params: { shipment_id },
			});
			setData(res.data);
		} catch (e) {
			setData([]);
			Toast.error(getApiErrorString(e));
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

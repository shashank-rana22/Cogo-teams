import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

export default function useGetServiceTimeline({ defaultParams = {}, defaultFilters = {}, initialCall = true }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/get_service_timeline',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getShipmentTimeline = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) getShipmentTimeline();
	}, [getShipmentTimeline, initialCall]);

	return {
		timelineLoading : loading,
		timelineData    : data || [],
		getShipmentTimeline,
		refetch         : getShipmentTimeline,
	};
}

import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCheckinStats = (coords) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_day_stats',
	}, { manual: true });

	const getCheckinStats = useCallback(
		() => {
			const { latitude, longitude } = coords || {};
			trigger({
				params: {
					lat  : latitude || undefined,
					long : longitude || undefined,
				},
			});
		},
		[coords, trigger],
	);

	useEffect(() => {
		getCheckinStats();
	}, [getCheckinStats]);

	return { loading, data, refetch: getCheckinStats };
};

export default useGetCheckinStats;

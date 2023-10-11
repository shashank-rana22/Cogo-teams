import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import { getCurrentLocation } from './useGetCurrentLocation';

const useGetCheckinStats = () => {
	const [coords, setCoords] = useState({});

	useEffect(() => {
		getCurrentLocation()
			.then((location) => {
				setCoords(location);
			})
			.catch((error) => {
				console.error('Error getting location:', error);
				Toast.error('Please Enable Location');
			});
	}, []);

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_day_stats',
	}, { manual: true });

	const getCheckinStats = useCallback(
		() => {
			const { latitude, longitude } = coords || {};

			if (latitude && longitude) {
				try {
					trigger({
						params: {
							lat  : latitude || undefined,
							long : longitude || undefined,
						},
					});
				} catch (error) {
					console.log('errr');
				}
			}
		},
		[coords, trigger],
	);

	useEffect(() => {
		getCheckinStats();
	}, [getCheckinStats]);

	return { loading, data, refetch: getCheckinStats };
};

export default useGetCheckinStats;

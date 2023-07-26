import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';

const useGetFclMapStatistics = ({ locationFilters }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_map_view_statistics',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.log(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		const filters = LOCATION_KEYS.reduce((acc, key) => {
			if (locationFilters[key]) {
				acc[key] = {
					id   : locationFilters[key].id,
					type : locationFilters[key].type,
				};
			}
			return acc;
		}, {});

		getStats({ filters });
	}, [locationFilters, getStats]);

	return { data, loading };
};

export default useGetFclMapStatistics;

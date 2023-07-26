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

	const filters = LOCATION_KEYS.reduce((acc, key) => {
		if (locationFilters[key]?.id) {
			acc[key] = {
				id   : locationFilters[key].id,
				type : locationFilters[key].type === 'seaport' ? 'port' : locationFilters[key].type,
			};
		}
		return acc;
	}, {});

	const dependency = Object.values(filters).map(({ id }) => id).join('_');
	const accuracyMapping = (data?.list || []).reduce((acc, item) => {
		Object.entries(item).forEach(([key, val]) => {
			if (key.includes('destination')) {
				acc[val] = item.accuracy;
			}
		});
		return acc;
	}, {});
	useEffect(() => {
		getStats({ filters });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency, getStats]);

	return { data: accuracyMapping, loading };
};

export default useGetFclMapStatistics;

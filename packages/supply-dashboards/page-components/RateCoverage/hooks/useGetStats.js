import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const apiName = {
	fcl_freight : 'get_fcl_freight_rate_stats',
	lcl_freight : 'get_lcl_freight_rate_stats',
	air_freight : 'get_air_freight_rate_stats',
};

const keyFormatter = (filter) => Object.fromEntries(
	Object.entries(filter).filter(([, value]) => value !== ''),
);

const useGetStats = (service) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : apiName[service],
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(async (filter = {}) => {
		const updateFilter = keyFormatter(filter);
		try {
			await trigger({
				params: { filters: { ...updateFilter } },
			});
		} catch (e) {
			// console.log(e)
		}
	}, [trigger]);

	useEffect(() => {
		getStats();
	}, [getStats, service]);

	return {
		data,
		loading,
		getStats,
	};
};
export default useGetStats;

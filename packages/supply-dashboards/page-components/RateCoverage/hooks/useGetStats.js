import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

// const apiName = {
// 	fcl_freight : 'get_fcl_freight_rate_coverage_stats',
// 	ltl_freight : 'get_ltl_freight_rate_stats',
// 	lcl_freight : 'get_lcl_freight_rate_stats',
// 	air_freight : 'get_air_freight_rate_dashboard_stats',
// };

const useGetStats = (service) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/fcl_freight_rate/get_fcl_freight_rate_coverage_stats',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(async (filter = {}) => {
		const finalFilter = Object.fromEntries(
			Object.entries(filter).filter(([, value]) => value !== ''),
		);
		try {
			await trigger({
				params: { filters: { ...finalFilter }, service },
			});
		} catch (err) {
			console.log(err);
		}
	}, [service, trigger]);

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

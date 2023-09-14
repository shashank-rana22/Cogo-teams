import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const API_END_POINT_MAPPING = {
	fcl_freight : 'get_fcl_freight_rate_job_stats',
	air_freight : 'get_air_freight_rate_job_stats',
};

const useGetCoverageStats = (filter) => {
	const service = filter?.service;
	const endPoint = API_END_POINT_MAPPING[service] || 'get_fcl_freight_rate_job_stats';

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || [],
	}));

	const { user: { id: user_id = '' } = {} } = user_data;

	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });
	const getStats = useCallback(async () => {
		const { assign_to_id, releventToMeValue, daily_stats, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};
		(Object.keys(restFilters) || []).forEach((item) => {
			if (restFilters[item]) {
				FINAL_FILTERS[item] = restFilters[item];
			}
		});

		try {
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						user_id      : releventToMeValue ? user_id : FINAL_FILTERS.user_id,
						daily_stats,
						weekly_stats : !daily_stats,
						start_date   : filter?.start_date,
						end_date     : filter?.end_date,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, user_id, filter]);

	useEffect(() => {
		getStats();
	}, [getStats, filter]);

	return {
		loading,
		data,
		getStats,
	};
};
export default useGetCoverageStats;

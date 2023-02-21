import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetFeedbackPerformanceStats = ({ user_id = '' }) => {
	const [performanceFilter, setPerformanceFilter] = useState(90);

	const [{ data: performanceStatsData = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'get_feedback_performance_stats',
		params : {
			filters: { last_n_days: performanceFilter || 30, user_id: user_id || undefined },
		},
	}, { manual: false });

	return {
		performanceStatsData,
		loading,
		performanceFilter,
		setPerformanceFilter,
	};
};

export default useGetFeedbackPerformanceStats;

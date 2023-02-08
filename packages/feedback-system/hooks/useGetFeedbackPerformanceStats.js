import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetFeedbackPerformanceStats = ({ user_id = '' }) => {
	const [performanceFilter, setPerformanceFilter] = useState(90);

	const [{ data: performanceStatsData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_feedback_performance_stats',
	}, { manual: true });

	const feedbackPerformanceStats = () => {
		try {
			trigger({
				params: {
					filters: { last_n_days: performanceFilter || 30, user_id: user_id || undefined },
				},
			});
		} catch (e) {
			console.log(e.toString());
		}
	};

	useEffect(() => {
		feedbackPerformanceStats();
	}, []);

	return {
		performanceStatsData,
		loading,
		performanceFilter,
		setPerformanceFilter,
	};
};

export default useGetFeedbackPerformanceStats;

import { useRequest } from '@cogoport/request';
import { addHours, addMinutes } from '@cogoport/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';

function useListFaqStats() {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const [date, setDate] = useState({});

	const { startDate, endDate } = date;

	const formatStartDate = useMemo(
		() => (startDate ? addMinutes(addHours(startDate, 5), 30) : undefined),
		[startDate],
	);

	const formatEndDate = useMemo(
		() => (endDate ? addMinutes(addHours(endDate, 5), 30) : undefined),
		[endDate],
	);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_stats',
	}, { manual: true });

	const fetchFaqStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						created_at_greater_than : formatStartDate || undefined,
						created_at_less_than    : formatEndDate || undefined,
						state                   : 'published',
						status                  : 'active',

					},
					page_limit                          : 1000 || undefined,
					most_viewed_questions_data_required : true,
					trending_tags_data_required         : true,
					trending_topics_data_required       : true,
					popular_questions_data_required     : true,
					unpopular_questions_data_required   : true,
					topic_wise_questions_data_required  : true,
					active_audiences_data_required      : true,
					question_stats_data_required        : true,
					data_required                       : false,
					get_pagination_data_required        : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [formatStartDate, formatEndDate, trigger]);

	useEffect(() => {
		fetchFaqStats();
	}, [page, date, fetchFaqStats]);

	const { page_limit, total_count } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchStats: fetchFaqStats,
		page,
		setPage,
		paginationData,
		data,
		loading,
		activeTab,
		setActiveTab,
		date,
		setDate,
	};
}

export default useListFaqStats;

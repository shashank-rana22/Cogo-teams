import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

function useAllTopicCardView({ date = ''}) {
	const { general = {} } = useSelector((state) => state);
	const { startDate, endDate } = date;
	const { query } = general;
	const { topicId = '' } = query || {};
	const [activeTab, setActiveTab] = useState(topicId || 'All Topics');
	const [page, setPage] = useState(1);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const fetchFaqTopic = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							created_at_greater_than : startDate,
							created_at_less_than    : endDate,

						},
						page_limit                     : 10,
						page,
						pagination_data_required       : true,
						most_viewed_questions_required : true,
						topic_wise_questions_required  : true,
						topic_wise_stats_required      : true,
						topic_wise_audience_required   : true,
						sort_by                        : 'view_count',
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[endDate, page, startDate, trigger],
	);

	useEffect(() => { fetchFaqTopic(); }, [fetchFaqTopic, date, page]);

	const { page_limit, total, total_count } = data || {};
	return {
		refetchTopic: fetchFaqTopic,
		data,
		loading,
		activeTab,
		setActiveTab,
		page,
		setPage,
		page_limit,
		total,
		total_count,
	};
}

export default useAllTopicCardView;

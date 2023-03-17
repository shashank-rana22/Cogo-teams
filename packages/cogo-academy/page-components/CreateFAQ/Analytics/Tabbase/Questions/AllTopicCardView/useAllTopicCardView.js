import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

function useAllTopicCardView() {
	const { general = {} } = useSelector((state) => state);

	const { query } = general;

	const { topicId = '' } = query || {};
	const [activeTab, setActiveTab] = useState(topicId || 'All Topics');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const fetchFaqTopic = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page_limit                     : 100000,
						pagination_data_required       : false,
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
		[trigger],
	);

	useEffect(() => { fetchFaqTopic(); }, [fetchFaqTopic]);

	return {
		refetchTopic: fetchFaqTopic,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useAllTopicCardView;

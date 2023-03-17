import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqStats({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
	date = '',
	setDate = () => {},

}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const { startDate, endDate } = date;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_stats',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const fetchFaqStats = async () => {
		try {
			await trigger({
				params: {
					filters: {

						q                       : query || undefined,
						faq_topic_id            : topicId || undefined,
						faq_tag_id              : tagId || undefined,
						created_at_greater_than : startDate,
						created_at_less_than    : endDate,

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
					get_data_required                   : false,
					get_pagination_data_required        : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetchFaqStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, topicId, JSON.stringify(tagId), date]);

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
		topicId,
	};
}

export default useListFaqStats;

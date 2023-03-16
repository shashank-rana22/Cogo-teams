import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqSearchHistories({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
	// limit = undefined,
	// sort = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_search_histories',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const fetchFaqSearchHistories = async () => {
		try {
			await trigger({
				params: {
					filters: {

						q            : query || undefined,
						faq_topic_id : topicId || undefined,
						faq_tag_id   : tagId || undefined,

					},

					page_limit               : 100000000 || undefined,
					pie_chart_data_required  : true,
					pagination_data_required : false,
					graph_data_required      : true,
				},
			});
		} catch (error) {
			console.log('error ::: ', error);
		}
	};

	useEffect(() => {
		fetchFaqSearchHistories();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, topicId, JSON.stringify(tagId)]);

	const { page_limit, total_count } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchSearchHistories: fetchFaqSearchHistories,
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

export default useListFaqSearchHistories;

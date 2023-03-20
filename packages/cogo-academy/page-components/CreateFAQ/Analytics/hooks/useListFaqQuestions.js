import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state        : 'published',
						status       : 'active',
						faq_topic_id : topicId || undefined,

					},
					page,
					page_limit                   : 10 || undefined,
					faq_tags_data_required       : true,
					answers_data_required        : true,
					get_pagination_data_required : true,
				},
			});
		} catch (error) {
			console.log('error ::: ', error);
		}
	};

	useEffect(() => {
		fetchFaqQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, topicId, JSON.stringify(tagId)]);

	const { page_limit, total_count } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchQuestions: fetchFaqQuestions,
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

export default useListFaqQuestions;

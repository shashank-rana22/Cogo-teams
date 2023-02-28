import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions({
	searchState = '',
	topicId = undefined,
	sort = false,
	tagId = [],
	limit = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const SORT_MODE = ((sort) ? 'view_count' : 'created_at');
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
						q            : query,
						faq_topic_id : topicId,
						faq_tag_id   : tagId,

					},
					sort_by    : SORT_MODE,
					page,
					page_limit : limit || undefined,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
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

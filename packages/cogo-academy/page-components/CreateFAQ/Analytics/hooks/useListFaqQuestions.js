import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

function useListFaqQuestions({
	topicId = undefined,
	sortType = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState('');

	const [{ data, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchInput);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInput]);

	const fetchFaqQuestions = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							faq_topic_id : topicId || undefined,
							q            : query || undefined,

						},
						sort_by                  : 'view_count',
						sort_type                : sortType,
						page,
						page_limit               : 10 || undefined,
						faq_tags_data_required   : true,
						answers_data_required    : true,
						faq_topics_data_required : true,
					},
				});
			} catch (error) {
				console.log('error ::: ', error);
			}
		},
		[page, query, sortType, topicId, trigger],
	);

	useEffect(() => {
		fetchFaqQuestions();
	}, [page, query, topicId, sortType, fetchFaqQuestions]);

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
		searchInput,
		setSearchInput,
	};
}

export default useListFaqQuestions;

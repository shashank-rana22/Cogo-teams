import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions({ searchState = '', topicId = '', sort = false }) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const SORT_MODE = ((sort) ? 'view_count' : 'created_at');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state        : 'published',
						status       : 'active',
						q            : searchState,
						faq_topic_id : topicId,

					},
					sort_by: SORT_MODE,
					page,
				},
			});
		} catch (error) {
			// console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqQuestions(); }, [page, searchState, topicId]);
	const { page_limit, total_count } = data || {};

	const paginationData = { page_limit, total_count };

	console.log('page_limit :: ', page_limit);

	return {
		refetchQuestions: fetchFaqQuestions,
		page,
		setPage,
		paginationData,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqQuestions;

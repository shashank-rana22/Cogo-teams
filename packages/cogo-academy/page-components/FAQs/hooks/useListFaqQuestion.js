import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions({ searchState = '', topicId = '', sort = false }) {
	const [activeTab, setActiveTab] = useState('');

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
				},
			});
		} catch (error) {
			// console.log('error :: ', error);
		}
	};

	useEffect(() => { fetchFaqQuestions(); }, [searchState, topicId]);

	return {
		refetchQuestions: fetchFaqQuestions,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqQuestions;

import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTopics({ searchTopicsInput = '' }) {
	const [topicCurrentPage, setTopicCurrentPage] = useState(1);
	const [activeTopic, setActiveTopic] = useState('active');
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchTopicsInput);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTopicsInput]);

	const fetchFaqTopic = async () => {
		try {
			await trigger({
				params: {
					page                 : !query ? topicCurrentPage : 1,
					page_limit           : 10,
					is_admin_view        : true,
					author_data_required : true,
					filters              : { q: query, status: activeTopic },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTopic(); }, [activeTopic, topicCurrentPage, query]);

	return {
		fetchFaqTopic,
		data,
		loading,
		activeTopic,
		setActiveTopic,
		topicCurrentPage,
		setTopicCurrentPage,
	};
}

export default useListFaqTopics;

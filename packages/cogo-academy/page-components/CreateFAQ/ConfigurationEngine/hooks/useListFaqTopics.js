import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTopics({ searchTopicsInput = '' }) {
	const [topicCurrentPage, setTopicCurrentPage] = useState(1);
	const [activeTopic, setActiveTopic] = useState('active');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const fetchFaqTopic = async () => {
		try {
			await trigger({
				params: {
					page       : topicCurrentPage,
					status     : activeTopic,
					page_limit : 5,
					filters    : { q: searchTopicsInput },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTopic(); }, [activeTopic, topicCurrentPage, searchTopicsInput]);

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

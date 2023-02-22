import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTopics() {
	const [topicCurrentPage, setTopicCurrentPage] = useState(1);
	const [activeTopic, setActiveTopic] = useState('active');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				data: { page: topicCurrentPage, status: activeTopic },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, [activeTopic]);

	return { fetchFaqTag, data, loading, activeTopic, setActiveTopic, topicCurrentPage, setTopicCurrentPage };
}

export default useListFaqTopics;

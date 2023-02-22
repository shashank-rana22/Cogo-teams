import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTopics() {
	const [topicCurrentPage, setTopicCurrentPage] = useState(1);
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				data: { page: topicCurrentPage },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, []);

	return { fetchFaqTag, data, loading, topicCurrentPage, setTopicCurrentPage };
}

export default useListFaqTopics;

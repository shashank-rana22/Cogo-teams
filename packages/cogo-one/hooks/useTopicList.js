import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useTopicList = () => {
	const [search, setSearch] = useState('');
	const [topic, setTopic] = useState({});
	const [page, setPage] = useState(1);
	const [question, setQuestion] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_faq_topics',
		method : 'get',
	}, { manual: true });

	const fetch = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					sort_by    : 'view_count',
					page,
					page_limit : 6,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const { list, ...paginationData } = data || {};

	return {
		search,
		setSearch,
		list,
		paginationData,
		loading,
		page,
		setPage,
		topic,
		setTopic,
		question,
		setQuestion,
	};
};

export default useTopicList;

import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useQuestionList = ({ topic = {}, search = '' }) => {
	const [page, setPage] = useState(1);
	const [question, setQuestion] = useState(null);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_faq_questions',
		method : 'get',
	}, { manual: true });

	const fetch = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status       : 'active',
						state        : 'published',
						faq_topic_id : [topic?.id] || undefined,
						q            : search || undefined,
					},
					page,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(topic), page, search]);

	useEffect(() => {
		if (search && setQuestion) {
			setQuestion(null);
		}
	}, [search]);

	const { list = [], ...pageData } = data || {};

	return {
		page,
		setPage,
		pageData,
		loading,
		list,
		question,
		setQuestion,
	};
};

export default useQuestionList;

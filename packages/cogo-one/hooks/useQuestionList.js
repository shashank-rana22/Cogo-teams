import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useQuestionList = ({
	topic = {}, search = '', question = '',
	setQuestion = () => {},
}) => {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	console.log('user_data:', user_data);

	const [page, setPage] = useState(1);

	const { query, debounceQuery } = useDebounceQuery();

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
	};
};

export default useQuestionList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListSetQuestions({ questionSetId, setSavedQuestionDetails, setAllKeysSaved, setEditDetails, query }) {
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_set_questions',
	}, { manual: true });

	const listSetQuestions = async ({ questionToShow = '', pageToShow }) => {
		try {
			const res = await trigger({
				params: {
					id         : questionSetId,
					page_limit : 10,
					page       : pageToShow || page,
					filters    : {
						q      : query,
						status : 'active',
					},
				},
			});

			if (!res?.data?.total_count && isEmpty(query)) {
				setSavedQuestionDetails([{ id: new Date().getTime(), isNew: true }]);
				setAllKeysSaved(false);
			} else {
				setAllKeysSaved(true);
				setSavedQuestionDetails(res?.data?.list || []);
			}

			if (!isEmpty(questionToShow)) {
				setEditDetails((res?.data?.list || []).find((item) => item.id === questionToShow) || {});
				setAllKeysSaved(false);
			}
		} catch (err) {
			setAllKeysSaved(true);
		}
	};

	useEffect(() => {
		listSetQuestions({ questionToShow: '' });
	}, [questionSetId, query, page]);

	return {
		loading,
		listSetQuestions,
		listData    : data?.list || [],
		total_count : data?.total_count,
		page,
		setPage,
	};
}

export default useListSetQuestions;

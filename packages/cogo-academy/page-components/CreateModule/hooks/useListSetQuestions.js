import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

function useListSetQuestions({ questionSetId, setSavedQuestionDetails, setAllKeysSaved, setEditDetails, query, mode }) {
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_set_questions',
	}, { manual: true });

	const listSetQuestions = useCallback(async ({ questionToShow = '', pageToShow }) => {
		try {
			const res = await trigger({
				params: {
					id         : questionSetId,
					page_limit : 5,
					page       : pageToShow || page,
					filters    : {
						q      : query,
						status : 'active',
					},
				},
			});

			if (!res?.data?.total_count && isEmpty(query) && mode !== 'view') {
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
	}, [mode, page, query, questionSetId, setAllKeysSaved, setEditDetails, setSavedQuestionDetails, trigger]);

	useEffect(() => {
		if (questionSetId) {
			listSetQuestions({ questionToShow: '' });
		}
	}, [questionSetId, query, page, listSetQuestions]);

	return {
		loading,
		listSetQuestions,
		listData    : data?.list || [],
		total_count : data?.total_count,
		page_limit  : data?.page_limit,
		page,
		setPage,
	};
}

export default useListSetQuestions;

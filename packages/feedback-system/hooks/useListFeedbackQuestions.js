import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListFeedbackQuestions = ({
	status = '',
	userId = '',
	formId = '',
	searchValue = '',
	showQuestion = false,
}) => {
	const [params, setParams] = useState({
		filters: {
			user_id : userId || undefined,
			status  : status || undefined,
			form_id : formId || undefined,
		},
		page: 1,
	});

	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_feedback_questions',
	}, { manual: true });

	const getQuestionList = async () => {
		try {
			await trigger({ params });
		} catch (e) {
			console.log(e.toString());
		}
	};

	const setPage = (p) => { setParams({ ...params, page: p }); };

	useEffect(() => { if (showQuestion) { getQuestionList(); } }, [params]);

	useEffect(() => {
		setParams({ ...params, filters: { ...(params.filters || {}), q: searchValue || undefined }, page: 1 });
	}, [searchValue]);

	return {
		loading,
		data,
		getQuestionList,
		params,
		setParams,
		setPage,
	};
};

export default useListFeedbackQuestions;

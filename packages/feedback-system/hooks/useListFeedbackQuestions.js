import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListFeedbackQuestions = ({
	status = '',
	userId = '',
	params = {},
	searchValue = '',
	showQuestion = true,
}) => {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_feedback_questions',
	}, { manual: true });

	const getQuestionList = async () => {
		try {
			await trigger({
				params: {
					...params,
					filters: {
						...(params.filters),
						user_id : userId || undefined,
						q       : searchValue || undefined,
						status,
					},
				},
			});
		} catch (e) {
			console.log(e.toString());
		}
	};

	useEffect(() => { if (showQuestion) { getQuestionList(); } }, [showQuestion, searchValue, params]);

	return {
		loading,
		data,
		getQuestionList,
	};
};

export default useListFeedbackQuestions;

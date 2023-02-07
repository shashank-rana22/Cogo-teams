import { useRequest } from '@cogoport/request';

const useUpdateFeedbackQuestions = () => {
	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'update_feedback_question',
	}, { manual: false });

	const onUpdateFeedback = ({ feedback_question_id = '' }) => {
		trigger({
			params: {
				id     : feedback_question_id,
				status : 'inactive',
			},
		});
	};

	return {
		loading,
		onUpdateFeedback,
	};
};

export default useUpdateFeedbackQuestions;

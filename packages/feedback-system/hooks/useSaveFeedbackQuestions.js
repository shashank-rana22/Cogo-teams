import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useSaveFeedbackQuestions = () => {
	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'update_feedback_question',
	}, { manual: true });

	const onSaveFeedbackQuestions = async ({
		questions = [],
		feedback_question_id = '',
		setQuestions = () => {},
		setConfirmEdit = () => {},
		reset = () => {},
		setShowForm = () => {},
		setShowbutton = () => {},
	}) => {
		try {
			await trigger({
				params: {
					...questions,
					id     : feedback_question_id,
					status : 'active',
				},
			});

			setQuestions((pv) => pv.map((item) => {
				if (item.feedback_question_id === feedback_question_id) {
					return { ...questions, feedback_question_id, status: 'active' };
				}
				return { ...item };
			}));
			setConfirmEdit(false);
			reset();
			setShowForm(false);
			setShowbutton(true);

			Toast.success('Question Updated Successfully');
		} catch (e) {
			Toast.error(e?.data?.question);
		}
	};

	return {
		onSaveFeedbackQuestions,
		loading,
	};
};

export default useSaveFeedbackQuestions;

import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useSaveFeedbackQuestions = () => {
	const getUpdatFeedbackApi = useRequest({
		method : 'post',
		url    : 'update_feedback_question',
	}, { manual: false });

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
			await getUpdatFeedbackApi.trigger({
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

			toast.success('Question Updated Successfully');
		} catch (e) {
			toast.error(e?.data?.question);
		}
	};

	return {
		onSaveFeedbackQuestions,
	};
};

export default useSaveFeedbackQuestions;

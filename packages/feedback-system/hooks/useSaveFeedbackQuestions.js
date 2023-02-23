import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import { useGetCreateQuestionsControls } from '../utils/createQuestionControls';

const useSaveFeedbackQuestions = () => {
	const formProps = useForm();

	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'update_question',
	}, { manual: true });

	const onSaveFeedbackQuestions = async ({
		questions = [],
		feedback_question_id = '',
		setQuestionActionList = () => {},
		setRefetchList = () => {},
		reset = () => {},
	}) => {
		try {
			await trigger({
				params: {
					...questions,
					id     : feedback_question_id,
					status : 'active',
				},
			});

			setQuestionActionList((pv) => ({ ...pv, edit: undefined }));
			setRefetchList(true);
			reset();

			Toast.success('Question Updated Successfully');
		} catch (e) {
			Toast.error(e?.data?.question);
		}
	};

	const controls = useGetCreateQuestionsControls();

	return {
		onSaveFeedbackQuestions,
		loading,
		controls,
		formProps,
	};
};

export default useSaveFeedbackQuestions;

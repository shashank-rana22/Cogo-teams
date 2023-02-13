import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import { controls } from '../utils/createQuestionControls';

const useAddFeedbackQuestion = ({ params }) => {
	const formProps = useForm();

	const [{ loading: apiLoading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'create_feedback_question',
	}, { manual: true });

	const onAddFeedbackQuestion = async ({
		questions = [],
		reset = () => {},
		setShowForm = () => {},
		setShowbutton = () => {},
		setRefetchList = () => {},
	}) => {
		try {
			await trigger({
				params: {
					...questions,
					department : params.filters.department,
					work_scope : params.filters.work_scope,
				},
			});

			Toast.success('Question added successfully');

			setRefetchList(true);

			reset();
			setShowForm(false);
			setShowbutton(true);

			return null;
		} catch (e) {
			Toast.error(e?.data?.question);
		}
		return null;
	};

	return {
		formProps,
		controls,
		onAddFeedbackQuestion,
		apiLoading,
	};
};

export default useAddFeedbackQuestion;

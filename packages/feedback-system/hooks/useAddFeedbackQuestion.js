import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import { useGetCreateQuestionsControls } from '../utils/createQuestionControls';

const useAddFeedbackQuestion = ({ setAddAnother = () => {} }) => {
	const formProps = useForm();

	const [{ loading: apiLoading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'create_feedback_question',
	}, { manual: true });

	const controls = useGetCreateQuestionsControls();

	const onAddFeedbackQuestion = async ({
		values = {},
		setRefetchList = () => {},
		reset = () => {},
	}) => {
		try {
			await trigger({
				params: {
					...values,
					department : 'hi',
					work_scope : 'hi',
					weight     : '5',
					remark     : 'hii',
				},
			});

			Toast.success('Question added successfully');

			setRefetchList(true);

			setAddAnother(true);
			reset(values);

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

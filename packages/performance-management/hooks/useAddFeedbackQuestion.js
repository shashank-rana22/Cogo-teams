import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useIrisRequest } from '@cogoport/request';

import { useGetCreateQuestionsControls } from '../utils/createQuestionControls';

const useAddFeedbackQuestion = () => {
	const formProps = useForm();

	const [{ loading: apiLoading = false }, trigger] = useIrisRequest({
		method : 'post',
		url    : 'post_iris_create_question',
	}, { manual: true });

	const controls = useGetCreateQuestionsControls();

	const onAddFeedbackQuestion = async ({
		values = {},
		setRefetchList = () => {},
		reset = () => {},
		setAddAnother = () => {},
	}) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});

			Toast.success('Question added successfully');

			setRefetchList(true);

			setAddAnother(true);
			reset(values);

			return null;
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
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

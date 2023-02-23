import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { useGetCreateQuestionsControls } from '../utils/createQuestionControls';

const useAddFeedbackQuestion = () => {
	const formProps = useForm();

	const [{ loading: apiLoading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'create_question',
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
			Toast.error(getApiErrorString(e.data));
		}
		return '';
	};

	return {
		formProps,
		controls,
		onAddFeedbackQuestion,
		apiLoading,
	};
};

export default useAddFeedbackQuestion;

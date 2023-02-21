import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import { useGetCreateQuestionsControls } from '../utils/createQuestionControls';

const useAddFeedbackQuestion = ({}) => {
	const formProps = useForm();

	const [{ loading: apiLoading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'create-question',
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

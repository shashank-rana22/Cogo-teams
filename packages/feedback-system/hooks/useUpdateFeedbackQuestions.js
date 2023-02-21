import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateFeedbackQuestions = () => {
	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'update-question',
	}, { manual: true });

	const onUpdateFeedback = async ({
		feedback_question_id = '',
		setRefetchList = () => {},
	}) => {
		try {
			await trigger({
				params: {
					id     : feedback_question_id,
					status : 'inactive',
				},
			});

			setRefetchList(true);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return {
		loading,
		onUpdateFeedback,
	};
};

export default useUpdateFeedbackQuestions;

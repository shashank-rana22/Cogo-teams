import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateQuestionSet = ({ searchquestion = '', setShow, setQuestionCreated, answer }) => {
	const [{ loading: createQuestionLoading = false }, trigger] = useRequest({
		url    : 'request_faq_question',
		method : 'POST',
	}, { manual: true });

	const createQuestionSet = async () => {
		if (!searchquestion) {
			Toast('Question cannot be empty');
			return;
		}

		try {
			const payload = {
				question_abstract: searchquestion,
				answer,

			};

			await trigger({ data: payload });

			setQuestionCreated(true);
			setShow(false);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		createQuestionSet,
		createQuestionLoading,
	};
};

export default useCreateQuestionSet;

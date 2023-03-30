import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateQuestionSet = () => {
	const [{ loading: createQuestionLoading = false }, trigger] = useRequest({
		url    : 'request_faq_question',
		method : 'POST',
	}, { manual: true });

	const createQuestionSet = async ({ searchState = '', setShow, setQuestionCreated }) => {
		if (!searchState) {
			Toast('Question cannot be empty');
			return;
		}

		try {
			const payload = {
				question_abstract: searchState,

			};

			await trigger({ data: payload });

			setQuestionCreated(true);
			setShow(false);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	return {
		createQuestionSet,
		createQuestionLoading,
	};
};

export default useCreateQuestionSet;

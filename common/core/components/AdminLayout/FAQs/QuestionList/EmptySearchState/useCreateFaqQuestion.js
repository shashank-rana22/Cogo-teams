import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateFaqQuestion = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/request_faq_question',
		method : 'post',
	}, { manual: true });

	const createFaqQuestion = async ({
		searchState = '',
		setShow,
		setQuestionCreated,
	}) => {
		if (!searchState) {
			Toast('Question cannot be Empty');
			return;
		}

		try {
			const payload = {
				question_abstract: searchState,
			};

			await trigger({
				data: payload,
			});

			setQuestionCreated(true);
			setShow(false);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		createFaqQuestion,
		createQuestionloading: loading,
	};
};

export default useCreateFaqQuestion;

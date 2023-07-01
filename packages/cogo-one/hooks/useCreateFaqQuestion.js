import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
			Toast.error('Question cannot be Empty');
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
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createFaqQuestion,
		loading,
	};
};

export default useCreateFaqQuestion;

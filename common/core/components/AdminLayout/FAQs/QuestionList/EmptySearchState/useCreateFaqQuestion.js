import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateFaqQuestion = ({
	searchQuestion = '',
	setShow,
	setQuestionCreated,
	answer,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/request_faq_question',
		method : 'post',
	}, { manual: true });

	const createFaqQuestion = async () => {
		if (!searchQuestion) {
			Toast('Question cannot be Empty');
			return;
		}

		try {
			const payload = {
				question_abstract: searchQuestion,
				answer,
			};

			await trigger({
				data: payload,
			});

			setQuestionCreated(true);
			setShow(false);
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};

	return {
		createFaqQuestion,
		createQuestionloading: loading,
	};
};

export default useCreateFaqQuestion;

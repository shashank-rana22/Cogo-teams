import { Toast } from '@cogoport/components';
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

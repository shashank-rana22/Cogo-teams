import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateQuestionSet = () => {
	const [{ loading: createQuestionLoading = false }, trigger] = useRequest({
		url    : 'create_question_answer_set',
		method : 'POST',
	}, { manual: false });

	const createQuestionSet = async ({ searchState = '', setShow }) => {
		if (!searchState) {
			Toast('Question cannot be empty');
			return;
		}

		try {
			const payload = {
				question_abstract : searchState,
				state             : 'requested',
				status            : 'active',
			};

			await trigger({ data: payload });

			Toast('Question Requested Successfully');
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

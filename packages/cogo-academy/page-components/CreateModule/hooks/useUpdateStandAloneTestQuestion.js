import { useRequest } from '@cogoport/request';

import getPayload from '../utils/getPayload';

function useUpdateStandAloneTestQuestion() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_stand_alone_test_question',
	}, { manual: true });

	const updateStandAloneTestQuestion = async ({
		values,
		questionSetId,
		getTestQuestionTest,
		reset,
		type = 'edit',
	}) => {
		try {
			await trigger({
				data: getPayload({ values, type, questionSetId, action: 'update' }),
			});

			reset();
			getTestQuestionTest({ questionSetId });
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading,
		updateStandAloneTestQuestion,
	};
}

export default useUpdateStandAloneTestQuestion;

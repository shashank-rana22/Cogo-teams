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
		reset = () => {},
		testQuestionId,
		action,
		setEditDetails,
		setAllKeysSaved,
	}) => {
		try {
			await trigger({
				data:
						action === 'delete'
							? { id: testQuestionId, status: 'inactive' }
							: getPayload({
								values,
								type: 'stand_alone',
								questionSetId,
								action,
								testQuestionId,
							}),
			});

			getTestQuestionTest({
				questionSetId,
				...(action === 'update' ? { questionToShow: testQuestionId } : null),
			});
			setAllKeysSaved(true);
			setEditDetails({});
			reset();
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

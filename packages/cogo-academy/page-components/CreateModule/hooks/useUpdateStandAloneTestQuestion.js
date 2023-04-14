import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const MAPPING = {
	delete : 'deleted',
	update : 'updated',
	create : 'added',
};

const TYPE_MAPPING = {
	single_correct : 'StandAlone',
	multi_correct  : 'StandAlone',
	subjective     : 'Subjective',

};

function useUpdateStandAloneTestQuestion({
	questionSetId,
	getTestQuestionTest,
	setEditDetails,
	setAllKeysSaved,
	reset = () => {},
	setQuestionToDelete = () => {},
	listSetQuestions,
	editDetails,
	editorValue = {},
}) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_non_case_study_test_question',
	}, { manual: true });

	const updateStandAloneTestQuestion = async ({
		values,
		action,
		testQuestionId,
		question_type = 'single_correct',
	}) => {
		try {
			const { hasError, ...payload } = getPayload({
				values,
				type: 'stand_alone',
				questionSetId,
				action,
				testQuestionId,
				editDetails,
				editorValue,
			});

			if (!isEmpty(hasError)) {
				hasError.forEach((item) => {
					Toast.error(item);
				});
				return;
			}

			await trigger({
				data: payload,
			});

			Toast.success(`${TYPE_MAPPING[question_type]} Question has been ${MAPPING[action]} successfully`);

			listSetQuestions({
				questionSetId,
				...(action === 'delete' ? { pageToShow: 1 } : null),
			});

			getTestQuestionTest({ questionSetId });

			setAllKeysSaved(true);
			setEditDetails({});
			setQuestionToDelete({});
			reset();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		loading,
		updateStandAloneTestQuestion,
	};
}

export default useUpdateStandAloneTestQuestion;

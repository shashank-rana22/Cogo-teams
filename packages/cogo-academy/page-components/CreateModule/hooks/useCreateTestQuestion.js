import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const actionNameMapping = {
	stand_alone : 'Stand Alone',
	case_study  : 'Case Study',
	subjective 	: 'Subjective',
};

function useCreateTestQuestion({
	reset,
	getTestQuestionTest,
	questionSetId,
	listSetQuestions,
	editorValue = {},
	subjectiveEditorValue = '',
}) {
	const [{ loading: loadingCaseStudy }, triggerCaseStudy] = useRequest({
		method : 'post',
		url    : '/create_case_study_test_question',
	}, { manual: true });

	const [{ loading: loadingNonCase }, triggerNonCase] = useRequest({
		method : 'post',
		url    : '/create_non_case_test_question',
	}, { manual: true });

	const TriggerMapping = {
		stand_alone : triggerNonCase,
		case_study  : triggerCaseStudy,
		subjective 	: triggerNonCase,
	};

	const createTestQuestion = async ({ values }) => {
		const { question_type = '' } = values || {};

		const { hasError, ...payload } = getPayload({
			values,
			questionSetId,
			type: question_type,
			editorValue,
			subjectiveEditorValue,
		});

		console.log('payload', payload);

		if (!isEmpty(hasError)) {
			hasError.forEach((item) => {
				Toast.error(item);
			});
			return;
		}
		const triggerToUse = TriggerMapping?.[question_type] || triggerNonCase;

		try {
			console.log('payload', payload);
			await triggerToUse({
				data: payload,
			});

			Toast.success(`${actionNameMapping[question_type]} question created successfully`);

			reset();
			listSetQuestions({ questionSetId });
			getTestQuestionTest({ questionSetId });
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'something went wrong');
		}
	};

	return {
		loading: loadingCaseStudy || loadingNonCase,
		createTestQuestion,
	};
}

export default useCreateTestQuestion;

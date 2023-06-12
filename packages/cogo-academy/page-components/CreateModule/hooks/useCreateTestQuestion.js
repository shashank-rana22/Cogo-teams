import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';

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
	questionEditorValue = {},
	setQuestionError,
	subjectiveEditorValue = '',
	caseStudyQuestionEditorValue,
	setUploadable,
	uploadable,
}) {
	const [{ loading: loadingCaseStudy }, triggerCaseStudy] = useRequest({
		method : 'post',
		url    : '/create_case_study_test_question',
	}, { manual: true });

	const [{ loading: loadingNonCase }, triggerNonCase] = useRequest({
		method : 'post',
		url    : '/create_non_case_study_test_question',
	}, { manual: true });

	const TRIGGER_MAPPING = {
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
			questionEditorValue,
			setQuestionError,
			subjectiveEditorValue,
			caseStudyQuestionEditorValue,
			uploadable,
			setUploadable,
		});

		if (!isEmpty(hasError)) {
			hasError.forEach((item) => {
				Toast.error(item);
			});
			return;
		}

		if (isEmpty(payload)) return;

		const triggerToUse = TRIGGER_MAPPING?.[question_type] || triggerNonCase;

		try {
			await triggerToUse({
				data: payload,
			});

			Toast.success(`${actionNameMapping[question_type]} question created successfully`);

			reset();
			listSetQuestions({ questionSetId });
			getTestQuestionTest({ questionSetId });
		} catch (err) {
			Toast.error(startCase(getApiErrorString(err.response?.data)) || 'Something Went Wrong');
		}
	};

	return {
		loading: loadingCaseStudy || loadingNonCase,
		createTestQuestion,
	};
}

export default useCreateTestQuestion;

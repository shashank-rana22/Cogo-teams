import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const actionNameMapping = {
	stand_alone : 'Stand Alone',
	case_study  : 'Case Study',
};

function useCreateTestQuestion({ reset, getTestQuestionTest, questionSetId, listSetQuestions }) {
	const [{ loading: loadingCaseStudy }, triggerCaseStudy] = useRequest({
		method : 'post',
		url    : '/create_case_study_test_question',
	}, { manual: true });

	const [{ loading: loadingStandAlone }, triggerStandAlone] = useRequest({
		method : 'post',
		url    : '/create_non_case_test_question',
	}, { manual: true });

	const TriggerMapping = {
		stand_alone : triggerStandAlone,
		case_study  : triggerCaseStudy,
	};

	const createTestQuestion = async ({ values }) => {
		const { question_type = '' } = values || {};

		const { hasError, ...payload } = getPayload({ values, questionSetId, type: question_type });

		if (!isEmpty(hasError)) {
			hasError.forEach((item) => {
				Toast.error(item);
			});
			return;
		}

		const triggerToUse = TriggerMapping?.[question_type] || triggerStandAlone;

		try {
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
		loading: loadingCaseStudy || loadingStandAlone,
		createTestQuestion,
	};
}

export default useCreateTestQuestion;

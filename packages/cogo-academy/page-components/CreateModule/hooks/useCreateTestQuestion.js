import { useRequest } from '@cogoport/request';

import getPayload from '../utils/getPayload';

function useCreateTestQuestion() {
	const [{ loading: loadingCaseStudy }, triggerCaseStudy] = useRequest({
		method : 'post',
		url    : '/create_case_study_test_question',
	}, { manual: true });

	const [{ loading: loadingStandAlone }, triggerStandAlone] = useRequest({
		method : 'post',
		url    : '/create_stand_alone_test_question',
	}, { manual: true });

	const TriggerMapping = {
		stand_alone : triggerStandAlone,
		case_study  : triggerCaseStudy,
	};

	const createTestQuestion = async ({ values, questionSetId, getTestQuestionTest, reset }) => {
		const { question_type = '' } = values || {};

		const triggerToUse = TriggerMapping?.[question_type] || triggerStandAlone;

		const payload = getPayload({ values, questionSetId, type: question_type });

		try {
			await triggerToUse({
				data: payload,
			});

			reset();
			getTestQuestionTest({ questionSetId });
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading: loadingCaseStudy || loadingStandAlone,
		createTestQuestion,
	};
}

export default useCreateTestQuestion;

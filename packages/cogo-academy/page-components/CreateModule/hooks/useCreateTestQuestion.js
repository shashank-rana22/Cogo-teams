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

	const createTestQuestion = async ({ values, questionSetId }) => {
		const { question_type = '' } = values || {};

		console.log('question_type', question_type);

		const triggerToUse = TriggerMapping?.[question_type] || triggerStandAlone;

		const payload = getPayload({ values, questionSetId, type: question_type });

		console.log('payload', payload);

		try {
			await triggerToUse({
				data: payload,
			});
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

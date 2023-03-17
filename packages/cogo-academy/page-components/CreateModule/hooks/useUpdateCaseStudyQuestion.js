import { useRequest } from '@cogoport/request';

import getPayload from '../utils/getPayload';

function useUpdateCaseStudyQuestion() {
	const [{ loading:loadingUpdate }, triggerUpdate] = useRequest({
		method : 'post',
		url    : '/update_case_study_question',
	}, { manual: true });

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/add_case_study_question',
	}, { manual: true });

	const triggerMapping = {
		create : trigger,
		update : triggerUpdate,
		delete : triggerUpdate,
	};

	const updateCaseStudyQuestion = async ({
		values,
		questionSetId,
		getTestQuestionTest,
		reset,
		setEditDetails,
		setAllKeysSaved,
		action,
		caseStudyQuestionId,
		testQuestionId,
	}) => {
		const triggerToUse = triggerMapping?.[action];

		try {
			await triggerToUse({
				data:
						action === 'delete'
							? { id: caseStudyQuestionId, status: 'inactive', answers: [] }
							: getPayload({
								values,
								editType : 'case_question',
								type     : 'case_study',
								questionSetId,
								action,
								caseStudyQuestionId,
								testQuestionId,
							}),
			});

			getTestQuestionTest({ questionSetId });
			setAllKeysSaved(true);
			setEditDetails({});
			reset();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading: loading || loadingUpdate,
		updateCaseStudyQuestion,
	};
}

export default useUpdateCaseStudyQuestion;

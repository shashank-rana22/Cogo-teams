import { useRequest } from '@cogoport/request';

import getPayload from '../utils/getPayload';

function useUpdateCaseStudyQuestion() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_case_study_question',
	}, { manual: true });

	const updateCaseStudyQuestion = async ({
		action,
		caseStudyQuestionId,
		questionSetId,
		getTestQuestionTest,
		reset,
		setEditDetails,
		setAllKeysSaved,
	}) => {
		try {
			await trigger({
				data:
						action === 'delete'
							? { id: caseStudyQuestionId, status: 'inactive' }
							: getPayload({
								// values,
								type: 'case_study',
								questionSetId,
								action,
								caseStudyQuestionId,
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
		loading,
		updateCaseStudyQuestion,
	};
}

export default useUpdateCaseStudyQuestion;

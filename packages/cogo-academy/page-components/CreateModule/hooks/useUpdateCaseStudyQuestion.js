import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const actionNameMapping = {
	delete : 'deleted',
	update : 'updated',
	create : 'added',
};

function useUpdateCaseStudyQuestion({
	questionSetId,
	getTestQuestionTest,
	setEditDetails,
	setAllKeysSaved,
	reset = () => {},
	listSetQuestions,
}) {
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
		action,
		caseStudyQuestionId,
		testQuestionId,
	}) => {
		const { hasError, ...payload } = getPayload({
			values,
			editType : 'case_question',
			type     : 'case_study',
			questionSetId,
			action,
			caseStudyQuestionId,
			testQuestionId,
		});

		if (!isEmpty(hasError)) {
			hasError.forEach((item) => {
				Toast.error(item);
			});
			return;
		}

		const triggerToUse = triggerMapping?.[action];

		try {
			await triggerToUse({
				data:
						action === 'delete'
							? { id: caseStudyQuestionId, status: 'inactive', answers: [] }
							: payload,
			});

			Toast.success(`Case study question ${actionNameMapping[action]} successfully`);

			listSetQuestions({ questionSetId, questionToShow: testQuestionId });
			getTestQuestionTest({ questionSetId });
			setAllKeysSaved(true);
			setEditDetails({});
			reset();
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		loading: loading || loadingUpdate,
		updateCaseStudyQuestion,
	};
}

export default useUpdateCaseStudyQuestion;

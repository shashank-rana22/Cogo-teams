import { useRequest } from '@cogoport/request';

const useListTestCaseStudyQuestions = ({ test_id = '', question_id = '', activeAttempt }) => {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/list_test_case_study_questions',
		params : {
			filters: {
				test_id,
				question_id,
			},
			active_questions_required: activeAttempt === 'attempt_1',
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
};
export default useListTestCaseStudyQuestions;

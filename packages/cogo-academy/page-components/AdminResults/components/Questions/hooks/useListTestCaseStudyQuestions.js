import { useRequest } from '@cogoport/request';

const useListTestCaseStudyQuestions = ({ test_id = '', question_id = '' }) => {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/list_test_case_study_questions',
		params : {
			filters: {
				test_id,
				question_id,
			},
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
};
export default useListTestCaseStudyQuestions;

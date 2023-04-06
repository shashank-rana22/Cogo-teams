import { useRequest } from '@cogoport/request';

const useGetTestResultQuestion = ({ test_id = '', question_id = '' }) => {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_test_result_question',
		params : {
			test_id,
			question_id,
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
};
export default useGetTestResultQuestion;

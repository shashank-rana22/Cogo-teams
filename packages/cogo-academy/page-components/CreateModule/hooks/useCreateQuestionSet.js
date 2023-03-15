import { useRequest } from '@cogoport/request';

function useCreateQuestionSet() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_test_question_set',
	}, { manual: true });

	const createQuestionSet = async ({ values, setQuestionSetId }) => {
		try {
			const res = await trigger({
				data: values,
			});

			setQuestionSetId(res?.data?.id);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading,
		createQuestionSet,
	};
}

export default useCreateQuestionSet;

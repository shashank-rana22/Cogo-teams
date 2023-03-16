import { useRequest } from '@cogoport/request';

function useCreateQuestionSet() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_test_question_set',
	}, { manual: true });

	const createQuestionSet = async ({ values, setQuestionSetId, getTestQuestionTest }) => {
		try {
			const res = await trigger({
				data: values,
			});

			getTestQuestionTest({ questionSetId: res?.data?.id });

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

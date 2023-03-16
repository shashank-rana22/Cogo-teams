import { useRequest } from '@cogoport/request';

function useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_test_question_set',
	}, { manual: true });

	const getTestQuestionTest = async ({ questionSetId }) => {
		try {
			const res = await trigger({
				params: { id: questionSetId, filters: { status: 'active' } },
			});

			if (res?.data?.question_count === 0) {
				setSavedQuestionDetails([{ id: new Date().getTime(), isNew: true }]);
				setAllKeysSaved(false);
			} else {
				setAllKeysSaved(true);
				setSavedQuestionDetails(res?.data?.test_questions);
			}
		} catch (err) {
			setAllKeysSaved(true);
		}
	};

	return {
		loading,
		data,
		getTestQuestionTest,
	};
}

export default useGetTestQuestionTest;

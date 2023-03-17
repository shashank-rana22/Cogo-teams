import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved, setEditDetails }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_test_question_set',
	}, { manual: true });

	const getTestQuestionTest = async ({ questionSetId, questionToShow }) => {
		try {
			const res = await trigger({
				params: { id: questionSetId },
			});

			if (!res?.data?.question_count) {
				setSavedQuestionDetails([{ id: new Date().getTime(), isNew: true }]);
				setAllKeysSaved(false);
			} else {
				setAllKeysSaved(true);
				setSavedQuestionDetails(res?.data?.test_questions);
			}

			if (!isEmpty(questionToShow)) {
				setEditDetails((res?.data?.test_questions || []).find((item) => item.id === questionToShow) || {});
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

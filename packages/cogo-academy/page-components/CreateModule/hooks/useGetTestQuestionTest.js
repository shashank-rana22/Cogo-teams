import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved, setEditDetails }) {
	const { general: { query } } = useSelector((state) => state);

	const { id } = query || {};

	const [questionSetId, setQuestionSetId] = useState(id);

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_test_question_set',
	}, { manual: true });

	const getTestQuestionTest = async ({ questionToShow, questionSetId:setId }) => {
		try {
			const res = await trigger({
				params: { id: setId },
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

	useEffect(() => {
		if (!isEmpty(id)) {
			getTestQuestionTest({ questionSetId: id });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		data,
		getTestQuestionTest,
		questionSetId,
		setQuestionSetId,
	};
}

export default useGetTestQuestionTest;

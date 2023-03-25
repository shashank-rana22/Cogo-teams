/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useGetTestQuestionTest({ setAllKeysSaved }) {
	const { general: { query } } = useSelector((state) => state);

	const { id } = query || {};

	const [questionSetId, setQuestionSetId] = useState(id);
	const [filters, setFilters] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_test_question_set',
	}, { manual: true });

	const getTestQuestionTest = async ({ questionSetId:setId }) => {
		try {
			await trigger({
				params: { id: setId, filters },
			});
		} catch (err) {
			setAllKeysSaved(true);
		}
	};

	useEffect(() => {
		if (!isEmpty(id)) {
			getTestQuestionTest({ questionSetId: id });
		}
	}, []);

	return {
		loading,
		data,
		getTestQuestionTest,
		questionSetId,
		setQuestionSetId,
		setFilters,
		filters,
	};
}

export default useGetTestQuestionTest;

import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetTestQuestionSets() {
	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
		},
	});
	const [input, setInput] = useState('');

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : 'list_test_question_sets',
		method : 'GET',
	}, { manual: true });

	const fetchList = () => {
		try {
			trigger({
				params: { ...params, filters: { ...params.filters, q: query } },
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, params]);

	return {
		data,
		loading,
		fetchList,
		setParams,
		input,
		setInput,
		params,
		debounceQuery,
	};
}

export default useGetTestQuestionSets;

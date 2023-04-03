import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

function useGetTestQuestionSets({ filters, activeTab = 'question_set', watch }) {
	const { query, debounceQuery } = useDebounceQuery();

	const cogo_entity_id = watch('cogo_entity_id');

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
		},
	});
	const [input, setInput] = useState('');

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_test_question_sets',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					...params,
					filters: {
						...params.filters,
						q: query,
						...filters,
					},
				},
			});
		} catch (error) {
			Toast.error(error.message);
		}
	}, [query, params, filters, trigger]);

	useEffect(() => {
		if (activeTab === 'question_set') {
			fetchList();
		}
	}, [fetchList, activeTab]);

	return {
		data,
		loading,
		fetchList: () => {},
		setParams,
		input,
		setInput,
		params,
		debounceQuery,
		cogo_entity_id,
	};
}

export default useGetTestQuestionSets;

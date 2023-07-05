import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

function useGetTestList({ filters:cogoEntityFilter, activeTab }) {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ loading = false, data = {} }, trigger] = useRequest({
		url    : '/list_tests',
		method : 'GET',
	}, { manual: true });

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
	});

	const [input, setInput] = useState('');

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					...params,
					filters: {
						...params.filters,
						q      : query,
						...cogoEntityFilter,
						status : ['active', 'draft', 'published', 'retest'],
					},
				},
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	}, [cogoEntityFilter, params, query, trigger]);

	useEffect(() => {
		if (activeTab === 'tests') {
			fetchList();
		}
	}, [query, params, cogoEntityFilter, activeTab, fetchList]);

	return {
		data,
		loading,
		fetchList,
		params,
		setParams,
		debounceQuery,
		input,
		setInput,
	};
}

export default useGetTestList;

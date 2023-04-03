import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

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

	const fetchList = () => {
		try {
			trigger({
				params: { ...params, filters: { ...params.filters, q: query, ...cogoEntityFilter } },
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};

	useEffect(() => {
		if (activeTab === 'tests') {
			fetchList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, params, cogoEntityFilter]);

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

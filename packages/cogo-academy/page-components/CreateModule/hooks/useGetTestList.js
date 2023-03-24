import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetTestList() {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ loading = false, data = {} }, trigger] = useRequest({
		url    : 'list_tests',
		method : 'GET',
	}, { manual: true });

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status : ['active', 'draft'],
			q      : '',
		},
	});

	const fetchList = () => {
		try {
			trigger({
				params: { ...params, filters: { ...params.filters, q: query } },
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};
	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return {
		data,
		loading,
		fetchList,
		params,
		setParams,
		debounceQuery,
	};
}

export default useGetTestList;

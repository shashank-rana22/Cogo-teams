import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

function useListCogoAcademyCourses({ filters, activeTab = '' }) {
	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
		},
	});

	const [input, setInput] = useState('');

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_cogo_academy_courses',
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
		if (activeTab === 'courses') {
			fetchList();
		}
	}, [fetchList, activeTab]);

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

export default useListCogoAcademyCourses;

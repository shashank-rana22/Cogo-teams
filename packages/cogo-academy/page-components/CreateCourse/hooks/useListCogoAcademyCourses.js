import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

function useListCogoAcademyCourses({ filters }) {
	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page                    : 1,
		course_details_required : true,
		filters                 : {
			status: ['active', 'inactive'],
		},
	});

	const [input, setInput] = useState('');

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_cogo_academy_courses',
		method : 'GET',
		params,
	}, { manual: false });

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

	return {
		data,
		loading,
		fetchList,
		setParams,
		input,
		setInput,
		params,
		debounceQuery,
		total_count: data.total_count,
	};
}

export default useListCogoAcademyCourses;

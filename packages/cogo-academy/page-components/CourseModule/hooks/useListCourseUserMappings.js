import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useMemo } from 'react';

function useListCourseUserMappings({ filters, activeTab }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const { query, debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const [input, setInput] = useState('');

	const finalPayload = useMemo(() => ({
		...params,
		filters: {
			...params.filters,
			q: query,
			...filters,
		},
	}), [filters, params, query]);

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_course_user_mappings',
		method : 'GET',
		params : finalPayload,
	}, { manual: false });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: finalPayload,
			});
		} catch (error) {
			Toast.error(error.message);
		}
	}, [trigger, finalPayload]);

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

export default useListCourseUserMappings;

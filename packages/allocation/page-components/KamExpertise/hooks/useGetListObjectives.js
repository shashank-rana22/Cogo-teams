import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useGetListObjectives() {
	const { query = '', debounceQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page      : 1,
		sort_type : 'asc',
		filters   : {
			status : ['inactive'],
			q      : query || undefined,
		},
	});

	const [{ loading = false, data }, trigger] = useAllocationRequest({
		url     : 'objectives',
		method  : 'get',
		authkey : 'get_allocation_objectives',
		params  : {
			page      : 1,
			sort_type : 'asc',
			filters   : {
				status : ['inactive'],
				q      : query || undefined,
			},
		},
	}, { manual: true });

	const refetchListObjectives = useCallback(async () => {
		try {
			await trigger({
				params: {
					...params,
					filters: {
						...params?.filters,
						q: query || undefined,
					},
				},
			});
		} catch (error) {
			// Toast.error('Failed to load objectives list');
		}
	}, [params, query, trigger]);

	useEffect(() => {
		refetchListObjectives();
	}, [params, query, refetchListObjectives]);

	return {
		loading,
		data,
		refetchListObjectives,
		params,
		setParams,
		debounceQuery,
	};
}

export default useGetListObjectives;

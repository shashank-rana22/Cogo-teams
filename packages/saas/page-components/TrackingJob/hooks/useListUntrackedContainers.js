import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utlis/toastApiError';

const useListUntrackedContainers = () => {
	const [filters, setFilters] = useState({ page: 1, sort_by: 'updated_at', sort_type: 'desc' });

	const [searchString, setSearchString] = useState('');

	const [serialId, setSerialId] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const { query:serialIdQuery = '', debounceQuery:serialDebounceQuery } = useDebounceQuery();

	const { page, sort_by, sort_type, ...restFilters } = filters;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_untracked_containers',
		params : {
			filters: {
				...restFilters,
				q         : query || undefined,
				serial_id : serialIdQuery || undefined,
			},
			page,
			sort_type,
			sort_by,
		},
	}, { manual: true });

	const refetch = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);
	useEffect(() => serialDebounceQuery(serialId), [serialId, serialDebounceQuery]);

	useEffect(() => {
		refetch();
	}, [refetch, serialIdQuery, query, filters]);

	return {
		data,
		filters,
		setFilters,
		loading,
		searchString,
		setSearchString,
		serialId,
		setSerialId,
		refetch,
	};
};

export default useListUntrackedContainers;

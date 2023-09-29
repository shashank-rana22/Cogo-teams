import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetAirTrackingList = () => {
	const [filters, setFilters] = useState({ page: 1, sort_by: 'updated_at', sort_type: 'desc' });
	const [searchString, setSearchString] = useState('');
	const [serialId, setSerialId] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_untracked_air_shipments',
	});

	const { query = '', debounceQuery } = useDebounceQuery();
	const { serialIdQuery = '', serialDebounceQuery = debounceQuery } = useDebounceQuery();
	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						...filters,
						q         : query || undefined,
						serial_id : serialIdQuery,
					},
					page      : filters?.page,
					sort_type : filters?.sort_type,
					sort_by   : filters?.sort_by,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [filters, query, trigger, serialIdQuery]);

	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);
	useEffect(() => serialDebounceQuery(serialId), [serialId, serialDebounceQuery]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		data,
		filters,
		setFilters,
		loading,
		searchString,
		setSearchString,
		serialId,
		setSerialId,
		trigger,
		refetch,
	};
};

export default useGetAirTrackingList;

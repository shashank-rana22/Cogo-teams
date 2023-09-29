import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetList = ({
	activeTab,
}) => {
	const [filters, setFilters] = useState({ page: 1, sort_by: 'updated_at', sort_type: 'desc' });
	const [searchString, setSearchString] = useState('');
	const [serialId, setSerialId] = useState('');

	const APINAME = {
		air_tracking   : '/list_untracked_air_shipments',
		ocean_tracking : '/list_untracked_containers',
		truck_tracking : '/list_saas_surface_shipment_details',
	};
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : APINAME[activeTab],
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						...filters,
						q         : query || undefined,
						serial_id : serialId,
						truck_number:
							activeTab === 'truck_tracking' && searchString
								? searchString
								: undefined,
					},
					page      : filters?.page,
					sort_type : filters?.sort_type,
					sort_by   : filters?.sort_by,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [activeTab, filters, query, trigger, searchString, serialId]);

	const reset = useCallback(() => {
		setFilters({ page: 1, sort_by: 'updated_at', sort_type: 'desc' });
		setSearchString('');
		setSerialId('');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	useEffect(() => {
		reset();
	}, [reset]);
	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);
	useEffect(() => debounceQuery(serialId), [serialId, debounceQuery]);

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

export default useGetList;

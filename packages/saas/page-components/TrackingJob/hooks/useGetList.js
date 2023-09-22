import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetList = ({
	activeTab,
}) => {
	const [filters, setFilters] = useState({ page: 1 });
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
	const refetch = async () => {
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
					page               : filters?.page,
					priority_sort_type : 'desc',
					sort_by            : 'updated_at',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);
	useEffect(() => debounceQuery(serialId), [serialId, debounceQuery]);

	useEffect(() => {
		setFilters({ page: 1 });
		setSearchString('');
	}, [activeTab]);
	useEffect(() => {
		refetch();
	}, [activeTab, filters, query]);

	return {
		data,
		filters,
		setFilters,
		loading,
		searchString,
		setSearchString,
		setSerialId,
		trigger,
		refetch,
	};
};

export default useGetList;

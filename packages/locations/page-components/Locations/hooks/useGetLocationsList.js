import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetLocationsList = () => {
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		type       : 'continent',
	});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'GET',
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		await trigger({
			params: {
				includes: {
					status                  : true,
					locality_id             : true,
					city_id                 : true,
					default_params_required : true,
				},
				filters: {
					...filters,
				},
				page       : filters?.page,
				page_limit : filters?.page_limit,

			},
		});
	}, [trigger, filters]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		filters,
		data,
		setFilters,
		refetch: apiTrigger,
	};
};

export default useGetLocationsList;

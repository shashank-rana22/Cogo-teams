import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeList = (selectedLocation) => {
	const [filters, setFilters] = useState({
		page_limit : 2,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_geo_location_mapping',
	}, { manual: true });

	const getEmployeeList = useCallback(
		() => {
			const { page_limit, page, ...rest } = filters;
			trigger({
				params: {
					filters: {
						...rest,
						q: query,
					},
					page_limit,
					page,
					location_id: selectedLocation,
				},
			});
		},
		[filters, query, selectedLocation, trigger],
	);

	useEffect(() => {
		if (selectedLocation) getEmployeeList();
	}, [getEmployeeList, selectedLocation]);

	return { loading, data, filters, setFilters, debounceQuery };
};

export default useGetEmployeeList;

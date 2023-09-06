import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeList = (selectedLocation) => {
	const [filters, setFilters] = useState({
		page_limit : 20,
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
		if (selectedLocation) {
			try {
				getEmployeeList();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [getEmployeeList, selectedLocation]);

	return { loading, data, filters, setFilters, debounceQuery, refetch: getEmployeeList };
};

export default useGetEmployeeList;

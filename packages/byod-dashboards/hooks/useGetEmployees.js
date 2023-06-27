import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetEmployees = (isAdmin) => {
	const [filters, setFilters] = useState({
		page   : 1,
		status : isAdmin ? 'verified' : 'active',
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : 'list_employee_device_details',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
	}, [query, setFilters]);

	const getEmployees = useCallback(() => {
		const { page, status } = filters || {};
		try {
			trigger({
				params: {
					filters: {
						q: query,
						status,
					},
					employee_details_required : true,
					required_keys             : ['id', 'employee_detail_id', 'status'],
					page,
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [query, trigger, filters]);

	useEffect(() => {
		getEmployees();
	}, [getEmployees]);

	return { data, loading, filters, setFilters, debounceQuery };
};

export default useGetEmployees;

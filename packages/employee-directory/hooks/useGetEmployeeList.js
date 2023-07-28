import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PAGE_NO = 1;

const useGetEmployeeList = () => {
	const [filters, setFilters] = useState({
		employee_status : 'confirmed',
		page            : DEFAULT_PAGE_NO,
	});
	const [employeeFilters, setemployeeFilters] = useState({});

	const [{ loading, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_details',
	}, { manual: true });

	const { query = '', debounceQuery } = useDebounceQuery();

	const getEmployeeList = useCallback(
		() => {
			try {
				const { sort_by, sort_type, page, ...rest } = filters || {};
				trigger({
					params: {
						filters: {
							...rest,
							employee_status: ['all_employees', 'inactive'].includes(rest.employee_status)
								? undefined : rest.employee_status,
							q      : query === '' ? undefined : query,
							status : rest.employee_status === 'inactive' ? 'inactive' : 'active',
							...employeeFilters,
						},
						sort_by,
						sort_type,
						page,
						page_limit             : 10,
						mappings_data_required : true,
					},
				});
			} catch (error) {
				console.log('err', error);
			}
		},
		[filters, trigger, query, employeeFilters],
	);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
	}, [query, setFilters]);

	useEffect(() => {
		getEmployeeList();
	}, [getEmployeeList]);

	return {
		setFilters,
		filters,
		debounceQuery,
		data,
		loading,
		setemployeeFilters,
		employeeFilters,
		refetch: getEmployeeList,
	};
};

export default useGetEmployeeList;

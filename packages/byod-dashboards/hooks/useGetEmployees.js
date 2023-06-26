import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetEmployees = () => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : 'list_employee_device_details',
		method : 'GET',
	}, { manual: true });

	const getEmployees = useCallback(() => {
		const { page } = filters;
		try {
			trigger({
				params: {
					employee_details_required : true,
					required_keys             : ['id', 'employee_detail_id', 'status'],
					page,
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger, filters]);

	useEffect(() => {
		getEmployees();
	}, [getEmployees]);

	return { data, loading, filters, setFilters };
};

export default useGetEmployees;

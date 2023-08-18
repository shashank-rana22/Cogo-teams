import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const getParams = ({ status, page, query }) => {
	const params = {
		filters: {
			q: query,
		},
		employee_details_required: true,
		page,
	};

	if (status === 'active') {
		params.filters.status = 'active';
		params.view = 'hr_view';
	}
	if (status === 'verified') {
		params.filters.status = 'verified';
		params.view = 'admin_view';
	}
	if (status === 'approved') {
		params.filters.status = 'approved';
	}
	if (status === 'rejected') {
		params.filters.status = 'rejected';
	}
	return params;
};

const useGetEmployees = () => {
	const [filters, setFilters] = useState({
		page   : 1,
		status : 'active',
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
		const params = getParams({ status, page, query });

		try {
			trigger({
				params,
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

import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeSelected = ({ filters = {} }) => {
	const [filtersState, setFiltersState] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_employee_payrolls',
	}, { manual: true });

	const getEmployeePayrolls = useCallback(
		async () => {
			try {
				const { departmentList, location, payband, payroll_status, ...rest } = filtersState;

				await trigger({
					params: {
						filters: {
							...rest,
							department            : departmentList,
							reporting_location_id : location,
							salary_band_ids       : payband,
							status                : payroll_status,
							q                     : query,
						},
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[filtersState, query, trigger],
	);

	useEffect(() => {
		getEmployeePayrolls();
	}, [getEmployeePayrolls]);

	useEffect(() => {
		const { page, page_limit, ...restFilters } = filters;
		setFiltersState(restFilters);
	}, [filters]);

	return { loading, data, debounceQuery, filtersState, setFiltersState };
};

export default useGetEmployeeSelected;

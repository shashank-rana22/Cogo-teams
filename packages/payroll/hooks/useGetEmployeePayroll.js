import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeePayrolls = ({
	employeeIds = [],
}) => {
	const [filters, setFilters] = useState({
		page_limit     : 5,
		page           : 1,
		payroll_status : 'pending',
	});
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_payrolls',
	}, { manual: true });

	const getEmployeePayrolls = useCallback(
		async () => {
			try {
				const {
					page_limit, page, departmentList, location, payband, payroll_status, role_id, ...rest
				} = filters;

				await trigger({
					params: {
						filters: {
							...rest,
							department_id         : departmentList,
							reporting_location_id : location,
							salary_band_id        : payband,
							status                : payroll_status,
							q                     : query,
							employee_id           : employeeIds,
							role_id,
						},
						page_limit,
						page,

					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters, query, trigger],
	);

	useEffect(() => {
		getEmployeePayrolls();
	}, [getEmployeePayrolls]);

	return {
		loading,
		data,
		filters,
		setFilters,
		debounceQuery,
		getEmployeePayrolls,
		refetch: getEmployeePayrolls,
	};
};

export default useGetEmployeePayrolls;

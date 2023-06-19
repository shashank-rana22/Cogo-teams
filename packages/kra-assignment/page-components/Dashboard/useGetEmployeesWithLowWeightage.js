import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetEmployeesWithLowWeightage() {
	const [filters, setFilters] = useState();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_employees_with_low_weightage',
		method : 'GET',
	}, { manual: true });

	const getEmployeesWithLowWeightage = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [trigger, filters]);

	useEffect(() => {
		getEmployeesWithLowWeightage();
	}, [getEmployeesWithLowWeightage]);

	return {
		data,
		loading,
		filters,
		setFilters,
	};
}

export default useGetEmployeesWithLowWeightage;

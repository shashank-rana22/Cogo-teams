import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetUnassignedEmployee() {
	const [filters, setFilters] = useState();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_unassigned_employees',
		method : 'GET',
	}, { manual: true });

	const getUnassignedEmployee = useCallback(async () => {
		// console.log(filters);
		const { employee_ids = [], ...rest } = filters || [];
		try {
			await trigger({
				params: {
					employee_ids,
					...rest,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [trigger, filters]);

	useEffect(() => {
		getUnassignedEmployee();
	}, [getUnassignedEmployee]);

	return {
		data,
		loading,
		filters,
		setFilters,
	};
}

export default useGetUnassignedEmployee;

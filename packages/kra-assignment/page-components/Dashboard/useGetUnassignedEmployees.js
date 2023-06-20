import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetUnassignedEmployee() {
	const [filters, setFilters] = useState();
	const [showKRACalculationTable, setShowKRACalculationTable] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_unassigned_employees',
		method : 'GET',
	}, { manual: true });

	const getUnassignedEmployee = useCallback(async () => {
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
		getUnassignedEmployee,
		showKRACalculationTable,
		setShowKRACalculationTable,
	};
}

export default useGetUnassignedEmployee;

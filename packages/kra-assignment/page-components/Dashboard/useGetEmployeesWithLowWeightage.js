import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useGetEmployeesWithLowWeightage({ filters }) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_employees_with_low_weightage',
		method : 'GET',
	}, { manual: true });

	const getEmployeesWithLowWeightage = useCallback(async () => {
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
		getEmployeesWithLowWeightage();
	}, [getEmployeesWithLowWeightage]);

	return {
		data,
		loading,
	};
}

export default useGetEmployeesWithLowWeightage;

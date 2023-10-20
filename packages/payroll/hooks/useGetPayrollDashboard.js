import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPayrollDashboard = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_payroll_dashboard',
	}, { manual: true });

	const getEmployeePayrollDashboard = useCallback(
		async () => {
			try {
				await trigger();
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger],
	);

	useEffect(() => {
		getEmployeePayrollDashboard();
	}, [getEmployeePayrollDashboard]);

	return { loading, data, getEmployeePayrollDashboard };
};

export default useGetPayrollDashboard;

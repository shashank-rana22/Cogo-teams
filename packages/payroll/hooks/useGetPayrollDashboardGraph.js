import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPayrollDashboardGraph = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_payroll_dashboard_graph',
	}, { manual: true });

	const getEmployeePayrollDashboardGraph = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					params: {
						given_date: payload,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger],
	);

	return { loading, data, getEmployeePayrollDashboardGraph };
};

export default useGetPayrollDashboardGraph;

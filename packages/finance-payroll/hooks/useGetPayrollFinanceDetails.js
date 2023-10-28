import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPayrollFinanceDetails = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_payroll_finance_details',
	}, { manual: true });

	const getNextPayrollDashboard = useCallback(
		async ({ selectedValue = '' }) => {
			console.log('s2', selectedValue);
			try {
				await trigger({
					params: {
						payroll_month: String(selectedValue),
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

	useEffect(() => {
		getNextPayrollDashboard();
	}, [getNextPayrollDashboard]);

	return { loading, data, getNextPayrollDashboard };
};

export default useGetPayrollFinanceDetails;

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPayrollOverview = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_payroll_overview',
	}, { manual: true });

	const getEmployeePayrollOverview = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					params: {
						current_date: payload,
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

	return { loading, data, getEmployeePayrollOverview };
};

export default useGetPayrollOverview;

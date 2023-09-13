import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeLeaveBalances = ({ value }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
	}, { manual: true });

	const getEmployeeLeaveBalances = useCallback(
		() => {
			trigger({
				params: {
					cycle_id: value,
				},
			});
		},
		[trigger, value],
	);

	useEffect(() => {
		if (value) {
			try {
				getEmployeeLeaveBalances();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [getEmployeeLeaveBalances, value]);

	return { loading, data, refetch: getEmployeeLeaveBalances };
};

export default useGetEmployeeLeaveBalances;

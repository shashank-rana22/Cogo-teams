import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeLeaveBalances = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
	}, { manual: true });

	const getEmployeeLeaveBalances = useCallback(
		() => {
			trigger();
		},
		[trigger],
	);

	useEffect(() => {
		try {
			getEmployeeLeaveBalances();
		} catch (error) {
			console.log('err', error);
		}
	}, [getEmployeeLeaveBalances]);

	return { loading, data };
};

export default useGetEmployeeLeaveBalances;

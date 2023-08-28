import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeLeaveBalances = () => {
	const [{ loading, data }, refetch] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
	}, { manual: false });

	return { loading, data, refetch };
};

export default useGetEmployeeLeaveBalances;

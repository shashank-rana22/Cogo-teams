import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeLeaveBalances = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
	}, { manual: false });

	return { loading, data };
};

export default useGetEmployeeLeaveBalances;

import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeLeaveBalances = ({ value }) => {
	const [{ loading, data }, refetch] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
		params : {
			cycle_id: value,
		},
	}, { manual: false });

	return { loading, data, refetch };
};

export default useGetEmployeeLeaveBalances;

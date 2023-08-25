import { useHarbourRequest } from '@cogoport/request';

const useGetLeaveBalance = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_balances',
	}, { manual: false });

	return { leaveData: data, leaveLoading: loading, data };
};

export default useGetLeaveBalance;

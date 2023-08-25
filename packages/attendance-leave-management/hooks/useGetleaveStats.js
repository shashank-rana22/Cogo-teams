import { useHarbourRequest } from '@cogoport/request';

const useGetLeaveStats = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_calendar',
	}, { manual: false });

	return { loading, data };
};

export default useGetLeaveStats;

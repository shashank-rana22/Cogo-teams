import { useHarbourRequest } from '@cogoport/request';

const useGetLeaveStats = (cycle_id) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_calendar',
		params : {
			cycle_id,
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetLeaveStats;

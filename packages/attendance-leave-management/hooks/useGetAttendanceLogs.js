import { useHarbourRequest } from '@cogoport/request';

const useGetAttendanceLogs = (cycle_id) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/list_attendance_logs',
		params : {
			cycle_id,
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetAttendanceLogs;

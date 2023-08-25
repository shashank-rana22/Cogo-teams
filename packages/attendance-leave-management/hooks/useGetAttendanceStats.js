import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetAttendanceStats = (cycle_id) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_attendance_stats',
	}, { manual: true });

	const getAttendaceStats = useCallback(
		() => {
			trigger({
				params: {
					cycle_id,
					performed_by_id: '50d1bb4e-b780-4ec7-ba51-2d1cfaf75f7d',
				},
			});
		},
		[cycle_id, trigger],
	);

	useEffect(() => {
		if (cycle_id) {
			getAttendaceStats();
		}
	}, [cycle_id, getAttendaceStats]);

	return { loading, data };
};

export default useGetAttendanceStats;

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
				},
			});
		},
		[cycle_id, trigger],
	);

	useEffect(() => {
		if (cycle_id) {
			try {
				getAttendaceStats();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [cycle_id, getAttendaceStats]);

	return { loading, data };
};

export default useGetAttendanceStats;

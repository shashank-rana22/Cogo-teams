import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetAttendanceLogs = (cycle_id) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_attendance_logs',
	}, { manual: true });

	const getAttendanceLogs = useCallback(
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
		if (!isEmpty(cycle_id)) {
			try {
				getAttendanceLogs();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [cycle_id, getAttendanceLogs]);

	return { loading, data, refetchLogs: getAttendanceLogs };
};

export default useGetAttendanceLogs;

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetLeaveStats = (cycle_id) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_leave_calendar',
	}, { manual: true });

	const getLeaveStats = useCallback(
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
				getLeaveStats();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [cycle_id, getLeaveStats]);

	return { loading, data };
};

export default useGetLeaveStats;

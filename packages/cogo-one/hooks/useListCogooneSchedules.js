import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import formatDateTime from '../utils/timezoneSpecificTime';

const getPayload = ({ startDate = '', endDate = '' }) => ({
	filters: {
		validity_start_less_than    : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
		validity_start_greater_than : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
		status                      : ['active', 'in_meting', 'completed'],
	},
	page_limit_required: false,
});

const useListCogooneSchedules = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogoone_schedules',
	}, { manual: true });

	const getEvents = useCallback(async ({ startDate = '', endDate = '' }) => {
		try {
			const payload = getPayload({ startDate, endDate });
			await trigger({ params: payload });
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		getEvents();
	}, [getEvents]);

	return {
		loading,
		data,
		getEvents,
	};
};

export default useListCogooneSchedules;

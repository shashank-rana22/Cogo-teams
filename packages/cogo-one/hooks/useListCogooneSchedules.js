import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import formatDateTime from '../utils/timezoneSpecificTime';

const getPayload = ({ startDate = '', endDate = '' }) => ({
	filters: {
		startDate : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
		endDate   : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
		status    : ['active', 'in_meting', 'completed'],
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
			await trigger({ data: payload });
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

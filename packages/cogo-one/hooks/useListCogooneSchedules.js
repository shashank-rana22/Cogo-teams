import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import formatDateTime from '../utils/timezoneSpecificTime';

const getPayload = ({ startDate = '', endDate = '' }) => ({
	filters: {
		schedule_start_greater_than : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
		schedule_start_less_than    : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
		exclude_status              : 'inactive',
	},
	page_limit_required    : false,
	calendar_data_required : true,
});

const useListCogooneSchedules = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogoone_schedules',
	}, { manual: true });

	const getEvents = useCallback(({ startDate = new Date(), endDate = new Date() } = {}) => {
		try {
			const payload = getPayload({ startDate, endDate });
			trigger({ params: payload });
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

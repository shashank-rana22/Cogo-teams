import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import formatDateTime from '../utils/timezoneSpecificTime';

const getPayload = ({ startDate = '', endDate = '' }) => ({
	filters: {
		validity_start_greater_than : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
		validity_end_greater_than   : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
	},

	metadata_required: true,
});

const useListCogooneCalendars = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogoone_calendars',
	}, { manual: true });

	const getListCalenders = useCallback(async ({ startDate, endDate }) => {
		try {
			const payload = getPayload({ startDate, endDate });
			await trigger({ params: payload });
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	return {
		calendersLoading : loading,
		calendersData    : data,
		getListCalenders,
	};
};

export default useListCogooneCalendars;

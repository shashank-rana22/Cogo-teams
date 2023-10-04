import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import formatDateTime from '../utils/timezoneSpecificTime';

const getPayload = ({ startDate = '', endDate = '' }) => ({
	filters: {
		validity_start_greater_than : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
		validity_end_greater_than   : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
	},

	schedule_data_required : false,
	metadata_required      : true,
});

const useListCogooneCalendars = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogoone_calendars',
	}, { manual: true });

	const getListCalenders = useCallback(({ startDate, endDate }) => {
		try {
			trigger({ params: getPayload({ startDate, endDate }) });
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

import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import getMonthStartAndEnd from '../utils/getMonthStartAndEnd';
import formatDateTime from '../utils/timezoneSpecificTime';

const getParams = ({ month = '', searchQuery }) => {
	const { startDate, endDate } = getMonthStartAndEnd({ month });

	return {
		filters: {
			validity_start_greater_than : formatDateTime({ date: startDate, dateformat: 'isoUtcDateTime' }),
			validity_end_less_than      : formatDateTime({ date: endDate, dateformat: 'isoUtcDateTime' }),
			status                      : ['active', 'expired'],
			q                           : searchQuery || undefined,
		},
		schedule_data_required    : false,
		metadata_required         : true,
		participant_data_required : true,
		page_limit                : 200,
	};
};

const useListCogooneCalendars = ({ searchValue = '', month = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogoone_calendars',
	}, { manual: true });

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const getListCalenders = useCallback(() => {
		try {
			trigger({
				params:
				getParams({ month, searchQuery }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, searchQuery, month]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		getListCalenders();
	}, [getListCalenders]);

	return {
		calendersLoading : loading,
		calendersData    : data,
		getListCalenders,
	};
};

export default useListCogooneCalendars;

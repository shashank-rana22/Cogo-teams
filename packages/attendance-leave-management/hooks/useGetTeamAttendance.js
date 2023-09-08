import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetTeamAttendance = (cycle_id) => {
	const [filters, setFilters] = useState({});

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_team_attendance',
	}, { manual: true });

	const getTeamAttendance = useCallback(
		() => {
			trigger({
				params: {
					filters: { q: searchQuery },
					cycle_id,
					...filters,
				},
			});
		},
		[cycle_id, filters, searchQuery, trigger],
	);

	useEffect(() => {
		if (cycle_id) {
			try {
				getTeamAttendance();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [cycle_id, getTeamAttendance]);

	return { loading, data, setFilters, filters, debounceQuery };
};

export default useGetTeamAttendance;

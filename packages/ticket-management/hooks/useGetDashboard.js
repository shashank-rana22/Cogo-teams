import { useTicketsRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import {
	useEffect,
	useCallback,
} from 'react';

const useGetDashboard = ({ date }) => {
	const { startDate, endDate } = date || {};

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/dashboard',
		method  : 'get',
		authkey : 'get_tickets_dashboard',
	}, { manual: true });

	const fetchTickets = useCallback(() => {
		try {
			trigger({
				params: {
					StartDate : format(startDate, 'isoUtcDateTime'),
					EndDate   : format(endDate, 'isoUtcDateTime'),
				},
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger, startDate, endDate]);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

	return {
		loading,
		data,
	};
};

export default useGetDashboard;

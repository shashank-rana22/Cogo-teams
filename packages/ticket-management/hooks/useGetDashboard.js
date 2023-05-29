import { useTicketsRequest } from '@cogoport/request';
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

	const fetchTickets = useCallback(async () => {
		try {
			await trigger({
				params: {
					StartDate : startDate,
					EndDate   : endDate,
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

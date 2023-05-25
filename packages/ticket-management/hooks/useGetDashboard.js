import { useTicketsRequest } from '@cogoport/request';
import {
	useEffect,
	useCallback,
} from 'react';

const useGetDashboard = () => {
	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/dashboard',
		method  : 'get',
		authkey : 'get_tickets_dashboard',
	}, { manual: true });

	const fetchTickets = useCallback(async () => {
		try {
			await trigger({
				params: {
					StartDate : '',
					EndDate   : '',
				},
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

	return {
		loading,
		data,
	};
};

export default useGetDashboard;

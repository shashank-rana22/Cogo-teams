import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTicketStats = ({ UserID = '' }) => {
	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/stats',
		method  : 'get',
		authkey : 'get_tickets_stats',
	}, { manual: true });

	const fetchTicketsStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					UserID,
				},
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [trigger, UserID]);

	useEffect(() => {
		if (UserID) {
			fetchTicketsStats();
		}
	}, [fetchTicketsStats, UserID]);

	return {
		data,
		loading,
	};
};
export default useGetTicketStats;

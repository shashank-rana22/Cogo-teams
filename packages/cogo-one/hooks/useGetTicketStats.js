import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTicketStats = ({ UserID = '', activeTab = '' }) => {
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
			// console.log('e:', e);
		}
	}, [trigger, UserID]);

	useEffect(() => {
		if (activeTab !== 'email' && UserID) {
			fetchTicketsStats();
		}
	}, [fetchTicketsStats, UserID, activeTab]);

	return {
		statsData    : data,
		statsLoading : loading,
		fetchTicketsStats,
	};
};
export default useGetTicketStats;

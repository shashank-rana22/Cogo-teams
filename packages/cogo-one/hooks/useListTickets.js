import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListTickets = ({ UserID = '', activeTab = '' }) => {
	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'list_tickets',
	}, { manual: true });

	const fetchTickets = useCallback(async () => {
		try {
			await trigger({
				params: {
					UserID,
				},
			});
		} catch (error) {
			// console.log("error:", error)

		}
	}, [trigger, UserID]);

	useEffect(() => {
		if (activeTab !== 'email' && UserID) {
			fetchTickets();
		}
	}, [fetchTickets, UserID, activeTab]);

	return {
		ticketData  : data,
		listLoading : loading,
		fetchTickets,
	};
};
export default useListTickets;

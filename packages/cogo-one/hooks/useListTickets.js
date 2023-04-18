import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListTickets = ({ UserID = '' }) => {
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
		fetchTickets();
	}, [fetchTickets, UserID]);

	return {
		ticketData: data,
		loading,
	};
};
export default useListTickets;

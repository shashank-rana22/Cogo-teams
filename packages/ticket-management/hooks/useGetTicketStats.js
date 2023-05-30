import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTicketStats = () => {
	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/stats',
		method  : 'get',
		authkey : 'get_tickets_stats',
	}, { manual: false });

	const ticketStats = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		ticketStats();
	}, [ticketStats]);

	return {
		statsLoading : loading,
		statsData    : data,
	};
};

export default useGetTicketStats;

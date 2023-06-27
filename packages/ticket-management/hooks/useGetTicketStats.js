import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ id }) => ({ PerformedByID: id });

const useGetTicketStats = () => {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/stats',
		method  : 'get',
		authkey : 'get_tickets_stats',
	}, { manual: false });

	const ticketStats = useCallback(() => {
		try {
			trigger({
				params: getParams({ id }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [id, trigger]);

	useEffect(() => {
		ticketStats();
	}, [ticketStats]);

	return {
		statsLoading : loading,
		statsData    : data,
	};
};

export default useGetTicketStats;

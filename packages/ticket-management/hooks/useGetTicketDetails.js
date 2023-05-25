import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTicketDetails = ({ ticketId }) => {
	// const { trigger, data, loading } = useRequest('get', false, 'cogocare', {
	// 	authkey: 'get_tickets_detail',
	// })('/detail');

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/detail',
		method  : 'get',
		authkey : 'get_tickets_detail',
	}, { manual: false });

	const getTicketDetails = useCallback(() => {
		try {
			console.log('ticketId', ticketId);
			console.log('ticketsidDetailFuncCall');
			trigger({
				params: {
					ID         : Number(ticketId),
					DisplayAll : true,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [ticketId, trigger]);

	useEffect(() => {
		if (ticketId) {
			getTicketDetails();
		}
	}, [getTicketDetails, ticketId]);

	return {
		getTicketDetails,
		detailsLoading : loading,
		ticketData     : data || '',
	};
};

export default useGetTicketDetails;

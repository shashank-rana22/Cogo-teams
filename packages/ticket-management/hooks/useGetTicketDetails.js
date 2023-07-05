import { useTicketsRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetTicketDetails = ({ ticketId }) => {
	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/detail',
		method  : 'get',
		authkey : 'get_tickets_detail',
	}, { manual: true });

	const getTicketDetails = useCallback(() => {
		try {
			trigger({
				params: {
					ID: Number(ticketId),
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, ticketId]);

	useEffect(() => {
		if (!(isEmpty(ticketId))) {
			getTicketDetails();
		}
	}, [ticketId, getTicketDetails]);

	return {
		getTicketDetails,
		detailsLoading : loading,
		ticketData     : data || '',
	};
};

export default useGetTicketDetails;

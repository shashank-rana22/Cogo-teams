import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const getParams = ({ ticketId, profile }) => ({
	ID            : Number(ticketId),
	PerformedByID : profile?.user?.id,
});

const useGetTicketDetails = ({ ticketId }) => {
	const profile = useSelector((state) => state.profile || {});

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/detail',
		method  : 'get',
		authkey : 'get_tickets_detail',
	}, { manual: true });

	const getTicketDetails = useCallback(() => {
		try {
			trigger({
				params: getParams({ ticketId, profile }),
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, ticketId, profile]);

	useEffect(() => {
		if (!(isEmpty(ticketId))) {
			getTicketDetails();
		}
	}, [ticketId, getTicketDetails]);

	return {
		getTicketDetails,
		detailsLoading : loading,
		ticketData     : data || {},
	};
};

export default useGetTicketDetails;

import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ id = '' }) => ({
	PerformedByID : id,
	SpectatorType : 'reviewer',
	Statuses      : 'unresolved',
});

const useGetUnreadTicketCount = ({ isTicketAllowed = false }) => {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/unread_count',
		method  : 'get',
		authkey : 'get_tickets_unread_count',
	}, { manual: true });

	const ticketCount = useCallback(() => {
		try {
			trigger({
				params: getParams({ id }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [id, trigger]);

	useEffect(() => {
		if (isTicketAllowed) {
			ticketCount();
		}
	}, [ticketCount, isTicketAllowed]);

	return {
		loading,
		data,
	};
};

export default useGetUnreadTicketCount;

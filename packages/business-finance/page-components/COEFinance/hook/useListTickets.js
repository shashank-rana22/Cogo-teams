import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

// eslint-disable-next-line max-len
const TICKET_POSSIBLE_STATUS = 'closed,rejected,unresolved,pending,escalated,overdue,reject_requested,resolve_requested';

const getPayload = ({
	serialId = '',
	page = '',
}) => ({
	status   : TICKET_POSSIBLE_STATUS,
	SortType : 'desc',
	SerialID : serialId,
	size     : 10,
	page,
});

const useListTickets = ({ serialId = '', page = '' }) => {
	const [{ data = {}, loading = false }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const getTickets = useCallback(() => {
		try {
			trigger({
				params: getPayload({
					serialId,
					page,
				}),
			});
		} catch (error) {
			Toast.error(error);
		}
	}, [trigger, serialId, page]);

	const { items, ...rest } = data || {};

	useEffect(() => {
		getTickets();
	}, [getTickets]);

	return {
		loading,
		getTickets,
		tickets  : items || [],
		pageData : rest,
	};
};

export default useListTickets;

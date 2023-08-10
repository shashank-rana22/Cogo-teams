import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

const getParams = ({ ticketId, pagination, id }) => ({
	TicketID           : Number(ticketId),
	page               : pagination,
	UserID             : id,
	IsInternalRequired : true,
});

const useGetTicketActivity = ({ ticketId }) => {
	const { user: { id = '' } } = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activities',
		method  : 'get',
		authkey : 'get_tickets_activities',
	}, { manual: true });

	const [listData, setListData] = useState({
		items       : [],
		page        : 0,
		total_pages : 0,
	});

	const getTicketActivity = useCallback(async (pagination) => {
		try {
			const res = await trigger({
				params: getParams({ ticketId, pagination, id }),
			});

			const {
				items = [],
				total_pages = 0,
				page = 0,
				last = false,
			} = res?.data || {};

			setListData((prev) => ({
				items: [...(prev.items || []), ...(items || [])],
				page,
				total_pages,
				last,
			}));
		} catch (error) {
			console.error(error);
		}
	}, [trigger, ticketId, id]);

	useEffect(() => {
		if (ticketId) {
			setListData({
				items       : [],
				page        : 0,
				total_pages : 0,
			});
			getTicketActivity(GLOBAL_CONSTANTS.zeroth_index);
		}
	}, [ticketId, getTicketActivity]);

	return {
		getTicketActivity,
		listData,
		setListData,
		chatLoading: loading,
	};
};

export default useGetTicketActivity;

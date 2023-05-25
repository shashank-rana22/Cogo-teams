import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetTicketActivity = ({ ticketId }) => {
	// const { loading, trigger } = useTicketsRequest('get', false, 'cogocare', {
	// 	authKey: 'get_tickets_activities',
	// })('/activities');

	const { loading, trigger } = useTicketsRequest({
		url     : '/activities',
		method  : 'get',
		authkey : 'get_tickets_activities',
	}, { manual: false });

	const [listData, setListData] = useState({
		items       : [],
		page        : 0,
		total_pages : 0,
	});

	const getTicketActivity = useCallback(async (pagination) => {
		try {
			const res = await trigger({
				params: {
					TicketID   : Number(ticketId),
					DisplayAll : true,
					page       : pagination,
					Types:
						'reviewer_assigned,rejected,reopened,ticket_updated,mark_as_resolved,respond',
				},
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
			console.log(error);
		}
	}, [ticketId, trigger]);

	useEffect(() => {
		if (ticketId) {
			setListData({
				items       : [],
				page        : 0,
				total_pages : 0,
			});
			getTicketActivity(0);
		}
	}, [getTicketActivity, ticketId]);

	return {
		getTicketActivity,
		listData,
		setListData,
		chatLoading: loading,
	};
};

export default useGetTicketActivity;

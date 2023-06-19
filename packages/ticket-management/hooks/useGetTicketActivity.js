import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetTicketActivity = ({ ticketId }) => {
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
				params: {
					TicketID : Number(ticketId),
					page     : pagination,

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
	}, [trigger, ticketId]);

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

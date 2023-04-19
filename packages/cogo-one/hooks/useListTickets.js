import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import { FILTER_KEYS_MAPPING } from '../constants';

const useListTickets = ({ UserID = '', activeTab = '' }) => {
	const [filter, setFilter] = useState('priority');

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'list_tickets',
	}, { manual: true });

	const fetchTickets = useCallback(async () => {
		try {
			await trigger({
				params: {
					UserID,
					...(FILTER_KEYS_MAPPING[filter] || {}),
				},
			});
		} catch (error) {
			// console.log("error:", error)
		}
	}, [trigger, UserID, filter]);

	useEffect(() => {
		if (activeTab !== 'email' && UserID) {
			fetchTickets();
		}
	}, [fetchTickets, UserID, activeTab]);

	return {
		ticketData  : data,
		listLoading : loading,
		fetchTickets,
		setFilter,
		filter,
	};
};
export default useListTickets;

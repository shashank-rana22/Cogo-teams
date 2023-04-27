import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import { FILTER_KEYS_MAPPING } from '../constants';

const useListTickets = ({ UserID = '', activeTab = '', fetchTicketsStats }) => {
	const [filter, setFilter] = useState('requested');
	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'list_tickets',
	}, { manual: true });

	const [pagination, setPagination] = useState(1);

	useEffect(() => {
		setPagination(1);
		fetchTicketsStats();
	}, [filter, fetchTicketsStats]);

	const fetchTickets = useCallback(async () => {
		try {
			await trigger({
				params: {
					...(FILTER_KEYS_MAPPING[filter] || {}),
					UserID,
					size : 10,
					page : pagination - 1,
				},

			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger, UserID, filter, pagination]);

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
		setPagination,
	};
};
export default useListTickets;

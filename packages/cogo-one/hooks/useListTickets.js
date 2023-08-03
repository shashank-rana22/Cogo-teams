import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

import { FILTER_KEYS_MAPPING } from '../constants';

const DEFAULT_PAGE_COUNT = 1;
const DEFAULT_PAGE_SIZE = 10;

const getParams = ({ filter, userId, pagination, performedById }) => ({
	...(FILTER_KEYS_MAPPING[filter] || {}),
	UserID        : userId || undefined,
	size          : DEFAULT_PAGE_SIZE,
	page          : pagination - DEFAULT_PAGE_COUNT,
	PerformedByID : performedById,
});

const useListTickets = ({ userId = '', activeTab = '', fetchTicketsStats = () => {} }) => {
	const { performedById } = useSelector(({ profile }) => ({ performedById: profile.user.id }));

	const [pagination, setPagination] = useState(DEFAULT_PAGE_COUNT);
	const [filter, setFilter] = useState('requested');

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const fetchTickets = useCallback(() => {
		if (activeTab === 'email' || !userId) {
			return null;
		}
		try {
			trigger({
				params: getParams({ filter, userId, pagination, performedById }),
			});
		} catch (error) {
			console.log('error:', error);
		}
		return null;
	}, [activeTab, userId, trigger, filter, pagination, performedById]);

	useEffect(() => {
		setPagination(DEFAULT_PAGE_COUNT);
		fetchTicketsStats();
	}, [filter, fetchTicketsStats]);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

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

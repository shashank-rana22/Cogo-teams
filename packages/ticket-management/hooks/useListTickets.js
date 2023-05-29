import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useState,
	useCallback,
} from 'react';

import { ticketSectionMapping } from '../constants';

const useListTickets = (searchValue, status, key, refreshList, setRefreshList) => {
	const [pagination, setPagination] = useState(1);
	const [ticketList, setTicketList] = useState({ list: [], total: 0 });

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const { profile } = useSelector((state) => state);

	const fetchTickets = useCallback(async (pageIndex) => {
		try {
			let payload = {
				PerformedByID : profile?.user?.id,
				size          : 10,
				page          : pageIndex - 1,
				QFilter       : searchQuery.text || undefined,
				Type          : searchQuery.category,

			};
			payload = { ...payload, ...(ticketSectionMapping?.[status] || {}) };

			const response = await trigger({
				params: payload,
			});

			if (response?.data?.items) {
				setTicketList((prev) => {
					if (prev) {
						return {
							list: [...(prev.list),
								...response.data.items],
							total: response.data.total,
						};
					}
					return {};
				});
			}
			setPagination(pageIndex + 1);
		} catch (error) {
			console.log('error:', error);
		}
	}, [profile?.user?.id, searchQuery.category, searchQuery.text, status, trigger]);

	useEffect(() => {
		setTicketList({ list: [], total: 0 });
		fetchTickets(1);
		if (refreshList[key]) {
			setRefreshList((prev) => ({ ...prev, [key]: false }));
		}
	}, [fetchTickets, searchQuery, setTicketList, key, refreshList, setRefreshList]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 20;
		const hasMoreData = pagination <= (data?.total_pages || 0);
		if (reachBottom && hasMoreData && !loading) {
			fetchTickets(pagination);
		}
	};

	return {
		ticketList,
		listLoading: loading,
		fetchTickets,
		handleScroll,
	};
};

export default useListTickets;

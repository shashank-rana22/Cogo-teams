import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useState,
	useCallback,
} from 'react';

const useListTickets = (searchValue, status, setTicketList, key) => {
	const { profile } = useSelector((state) => state);
	const [pagination, setPagination] = useState(1);
	// const [listData, setListData] = useState([]); ***

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const fetchTickets = useCallback(async (pageIndex) => {
		try {
			const response = await trigger({
				params: {
					Status  : status,
					UserID  : profile?.id,
					// size    : listType === 'create' ? 2 : 10,
					size    : 10,
					page    : pageIndex - 1,
					QFilter : searchQuery || undefined,
				},
			});

			// setListData((prev) => [...prev, ...(response?.data?.items || [])]); ***
			if (response?.data?.items) {
				setTicketList((prev) => {
					if (prev) {
						return {
							...prev,
							[key]: [...prev[key], ...response.data.items],
						};
					}
					return {};
				});
			}
			setPagination(pageIndex + 1);
		} catch (error) {
			console.log('error:', error);
		}
	}, [key, profile?.id, searchQuery, setTicketList, status, trigger]);

	const refreshTickets = () => {
		// setListData([]); ***
		fetchTickets(1);
	};

	useEffect(() => {
		setTicketList((prev) => ({
			...prev,
			[key]: [],
		}));
		fetchTickets(1);
	}, [fetchTickets, key, searchQuery, setTicketList]);

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
		listLoading: loading,
		fetchTickets,
		handleScroll,
		refreshTickets,
	};
};

export default useListTickets;

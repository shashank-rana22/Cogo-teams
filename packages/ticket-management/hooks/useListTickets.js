import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useState,
	useCallback,
} from 'react';

import { ticketSectionMapping } from '../constants';

const useListTickets = ({
	searchParams,
	status,
	label,
	refreshList,
	setRefreshList,
}) => {
	const [pagination, setPagination] = useState(1);
	const [tickets, setTickets] = useState({ list: [], total: 0 });

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const { profile } = useSelector((state) => state);

	const getPayload = useCallback((pageIndex) => {
		const payload = {
			PerformedByID : profile?.user?.id,
			size          : 10,
			page          : pageIndex - 1,
			AgentID       : searchParams.agent,
			QFilter       : searchQuery || undefined,
			Type          : searchParams.category,
		};
		return { ...payload, ...(ticketSectionMapping?.[status] || {}) };
	}, [profile?.user?.id, searchParams?.category, searchQuery, searchParams?.agent, status]);

	const fetchTickets = useCallback(async (pageIndex) => {
		try {
			const response = await trigger({
				params: getPayload(pageIndex),
			});

			if (response?.data?.items) {
				setTickets((prev) => ({
					list: [...(prev.list),
						...response.data.items],
					total: response.data.total,
				}));
			}
			setPagination(pageIndex + 1);
		} catch (error) {
			console.log('error:', error);
		}
	}, [getPayload, trigger]);

	useEffect(() => {
		setTickets({ list: [], total: 0 });
		fetchTickets(1);
		if (refreshList?.[label]) {
			setRefreshList((prev) => ({ ...prev, [label]: false }));
		}
	}, [fetchTickets, searchQuery, setTickets, label, refreshList, setRefreshList]);

	useEffect(() => {
		debounceQuery(searchParams?.text);
	}, [debounceQuery, searchParams?.text]);

	const handleScroll = ({ clientHeight, scrollTop, scrollHeight }) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 20;
		const hasMoreData = pagination <= (data?.total_pages || 0);
		if (reachBottom && hasMoreData && !loading) {
			fetchTickets(pagination);
		}
	};

	return {
		tickets,
		listLoading: loading,
		fetchTickets,
		handleScroll,
	};
};

export default useListTickets;

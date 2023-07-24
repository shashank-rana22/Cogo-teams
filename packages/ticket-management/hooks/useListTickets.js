import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useState,
	useCallback,
} from 'react';

import { TICKET_SECTION_MAPPING } from '../constants';

const DEFAULT_PAGE = 1;
const PAGE_DECREMENT = 1;
const PAGE_INCREMENT = 1;
const MIN_TICKET_COUNT = 1;
const WINDOW_VIEW = 20;

const useListTickets = ({
	searchParams,
	status,
	label,
	refreshList,
	setRefreshList,
	isUpdated,
	setIsUpdated,
}) => {
	const { agent, category, spectatorType } = searchParams || {};
	const [pagination, setPagination] = useState(DEFAULT_PAGE);
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
			page          : pageIndex - PAGE_DECREMENT,
			AgentID       : agent || undefined,
			QFilter       : searchQuery || undefined,
			Type          : category || undefined,
			SpectatorType : spectatorType || undefined,
		};
		return { ...payload, ...(TICKET_SECTION_MAPPING?.[status] || {}) };
	}, [profile?.user?.id, category, searchQuery, agent, status, spectatorType]);

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
			setPagination(pageIndex + PAGE_INCREMENT);
		} catch (error) {
			console.error('error:', error);
		}
	}, [getPayload, trigger]);

	useEffect(() => {
		setTickets({ list: [], total: 0 });
		fetchTickets(MIN_TICKET_COUNT);
		if (refreshList?.[label]) {
			setRefreshList((prev) => ({ ...prev, [label]: false }));
		}
	}, [fetchTickets, searchQuery, setTickets, label, refreshList, setRefreshList]);

	useEffect(() => {
		if (isUpdated) {
			setTickets({ list: [], total: 0 });
			fetchTickets(MIN_TICKET_COUNT);
			if (refreshList?.[label]) {
				setRefreshList((prev) => ({ ...prev, [label]: false }));
			}
			setIsUpdated(false);
		}
	}, [fetchTickets, isUpdated, label, refreshList, setRefreshList, setIsUpdated]);

	useEffect(() => {
		debounceQuery(searchParams?.text);
	}, [debounceQuery, searchParams?.text]);

	const handleScroll = ({ clientHeight, scrollTop, scrollHeight }) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= WINDOW_VIEW;
		const hasMoreData = pagination <= (data?.total_pages || DEFAULT_PAGE);
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

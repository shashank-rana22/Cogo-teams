import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
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
const MORE_TICKETS_TIMEOUT = 4000;

const getPayload = ({
	performerId, pageIndex, agent, searchQuery, category, spectatorType, startDate, endDate,
}) => ({
	PerformedByID : performerId,
	size          : 10,
	page          : pageIndex - PAGE_DECREMENT,
	AgentID       : agent || undefined,
	QFilter       : searchQuery || undefined,
	Type          : category || undefined,
	SpectatorType : spectatorType || undefined,
	StartDate     : formatDate({
		date       : startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	}) || undefined,
	EndDate: formatDate({
		date       : endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	}) || undefined,
});

const useListTickets = ({
	searchParams,
	spectatorType,
	status,
	label,
	date,
	refreshList,
	setRefreshList,
	isUpdated,
	setIsUpdated,
}) => {
	const { startDate, endDate } = date || {};
	const { agent, category } = searchParams || {};

	const { profile = {} } = useSelector((state) => state);

	const performerId = profile?.user?.id;

	const [pagination, setPagination] = useState(DEFAULT_PAGE);
	const [tickets, setTickets] = useState({ list: [], total: 0 });
	const [hasMoreTickets, setHasMoreTickets] = useState(true);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const formattedPayload = useCallback((pageIndex) => {
		const payload = getPayload({
			performerId, pageIndex, agent, searchQuery, category, spectatorType, startDate, endDate,
		});
		return { ...payload, ...(TICKET_SECTION_MAPPING?.[status] || {}) };
	}, [performerId, agent, searchQuery, category, spectatorType, startDate, endDate, status]);

	const fetchTickets = useCallback(async (pageIndex) => {
		try {
			const response = await trigger({
				params: formattedPayload(pageIndex),
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
	}, [formattedPayload, trigger]);

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
		} else if (hasMoreTickets) {
			setHasMoreTickets(false);
		} else {
			setTimeout(() => {
				setHasMoreTickets(true);
			}, MORE_TICKETS_TIMEOUT);
		}
	};

	return {
		tickets,
		listLoading: loading,
		fetchTickets,
		handleScroll,
		hasMoreTickets,
	};
};

export default useListTickets;

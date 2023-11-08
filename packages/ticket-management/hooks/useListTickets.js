import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useState,
	useCallback,
} from 'react';

import { TICKET_SECTION_MAPPING } from '../constants';
import { getPayload } from '../utils/getListPayload';

const DEFAULT_PAGE = 1;

const PAGE_INCREMENT = 1;
const MIN_TICKET_COUNT = 1;
const WINDOW_VIEW = 20;

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
	sortBy,
	idFilters = {},
	setIdFilters = () => {},
}) => {
	const { startDate, endDate } = date || {};
	const { agent, category } = searchParams || {};
	const { sortOrder = '', sortType = '' } = sortBy || {};
	const {
		idType = '', serialId = '', category: filterCategory = '',
		subcategory = '', raisedBy = '', raisedTo = '',
		service = '', trade = '', requestType = '',
	} = idFilters || {};

	const { id : performerId = '' } = useSelector((state) => state?.profile?.user);

	const [pagination, setPagination] = useState(DEFAULT_PAGE);
	const [tickets, setTickets] = useState({ list: [], total: 0 });
	const [reachedBottom, setReachedBottom] = useState(false);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const formattedPayload = useCallback((pageIndex) => {
		const payload = getPayload({
			performerId,
			pageIndex,
			agent,
			searchQuery,
			category,
			spectatorType,
			startDate,
			endDate,
			sortType,
			sortOrder,
			idType,
			serialId,
			filterCategory,
			subcategory,
			raisedBy,
			raisedTo,
			service,
			trade,
			requestType,
		});
		return { ...payload, ...(TICKET_SECTION_MAPPING?.[status] || {}) };
	}, [performerId, agent, searchQuery, category, spectatorType,
		startDate, endDate, sortType, sortOrder, idType, serialId, requestType,
		filterCategory, subcategory, raisedBy, raisedTo, service, trade, status]);

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
			setIdFilters((prev) => ({ ...prev, show: false }));
		} catch (error) {
			console.error('error:', error);
		}
	}, [formattedPayload, setIdFilters, trigger]);

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
		} else if (reachBottom && !loading && !reachedBottom) {
			setReachedBottom(true);
		}
	};

	return {
		tickets,
		listLoading: loading,
		fetchTickets,
		handleScroll,
		reachedBottom,
	};
};

export default useListTickets;

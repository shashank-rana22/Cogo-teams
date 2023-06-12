import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useCallback, useContext } from 'react';

import BookingDeskContext from '../context/BookingDeskContext';
import getPayload from '../helpers/getListBookingDeskShipmentsPayload';

import useCallApi from './useCallApi';

const DEFAULT_TOTAL_COUNT = 0;
const DEFAULT_TOTAL_PAGE = 0;
const PAGE_ONE = 1;

const EMPTY_DATA = { list: [], total: 0, total_page: 0 };

export default function useListBookingDeskShipments({ prefix }) {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const { filters, setFilters, tabState } = useContext(BookingDeskContext) || {};

	const [data, setData] = useState(EMPTY_DATA);

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_booking_desk_shipments`,
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: getPayload({ filters, tabState, selected_agent_id }),
			});

			if (isEmpty(res.data?.list) && filters.page > PAGE_ONE) {
				setFilters({ ...filters, page: 1 });
			} else {
				setData(res.data || {});
			}
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || 'Something went wrong !!';
			if (message !== 'canceled') { Toast.error(message); }
			setData(EMPTY_DATA);
		}
	}, [filters, selected_agent_id, setFilters, tabState, trigger]);

	useCallApi({ listShipments, filters, authParams, tabState, selected_agent_id });

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || DEFAULT_TOTAL_COUNT,
			total_page : data.total || DEFAULT_TOTAL_PAGE,
		},
		loading,
		refetch: listShipments,
	};
}

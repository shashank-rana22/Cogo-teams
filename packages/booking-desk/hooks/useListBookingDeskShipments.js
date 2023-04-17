import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback } from 'react';

import getPayload from '../helpers/getListBookingDeskShipmentsPayload';

import useCallApi from './useCallApi';

const emptyData = { list: [], total: 0, total_page: 0 };

export default function useListBookingDeskShipments({ stateProps, prefix }) {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const { filters, setFilters, activeTab } = stateProps;

	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_booking_desk_shipments`,
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: getPayload({ filters, activeTab, selected_agent_id }),
			});

			if (res.data?.list?.length === 0 && filters.page > 1) {
				setFilters({ ...filters, page: 1 });
			} else {
				setData(res.data || {});
			}
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || 'Something went wrong !!';
			if (message !== 'canceled') { Toast.error(message); }
			setData(emptyData);
		}
	}, [filters, setFilters, activeTab, trigger, selected_agent_id]);

	useCallApi({ listShipments, filters, authParams, activeTab, selected_agent_id });

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || 0,
			total_page : data.total || 0,
		},
		loading,
		refetch: listShipments,
	};
}

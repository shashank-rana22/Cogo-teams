import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

import getPayload from '../helpers/getListBookingDeskShipmentsPayload';

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
			} else { setData(res.data || {}); }
		} catch (e) {
			Toast.error(e?.response?.data?.message || e.message || 'Something went wrong !!');
			setData(emptyData);
		}
	}, [filters, setFilters, activeTab, trigger, selected_agent_id]);

	useEffect(() => {
		const [, scope, view_type] = (authParams || '').split(':');
		if (!scope) {
			return;
		}
		listShipments();

		const scopeFilters = { scope, view_type, selected_agent_id };

		const toBeStoredValue = JSON.stringify({ filters, activeTab, scopeFilters });
		localStorage.setItem('booking_desk_stored_values', toBeStoredValue);
	}, [listShipments, activeTab, filters, authParams, selected_agent_id]);

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

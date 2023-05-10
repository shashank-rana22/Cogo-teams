import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getListBookingDeskShipmentsPayload from '../helpers/getListBookingDocumentsPayload';

const emptyData = { list: [], total_count: 0, total_page: 0 };

export default function useListBookingDocuments({ filters, activeTab }) {
	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_booking_documents',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(async () => {
		try {
			const res = await trigger({
				params: getListBookingDeskShipmentsPayload({ activeTab, filters }),
			});

			setData(res.data || {});
		} catch (err) {
			const message = err?.response?.data?.message
				|| err?.message
				|| 'Something went wrong !!';

			if (message !== 'canceled') { Toast.error(message); }
			setData(emptyData);
		}
	}, [filters, activeTab, trigger]);

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	return {
		data: {
			list        : data.list || [],
			total_count : data.total_count || 0,
			total_page  : data.total || 0,
		},
		loading,
		refetch: fetchList,
	};
}

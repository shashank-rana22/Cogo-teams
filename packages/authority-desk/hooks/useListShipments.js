import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

function useListShipments({ item, filters }) {
	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						state                : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
						is_job_closed        : false,
						importer_exporter_id : item?.importer_exporter_id,
					},
					invoice_value_required : true,
					page                   : filters.page,
				},
			});
			setData(res.data);
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, item?.importer_exporter_id, filters]);

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		data,
		loading,
	};
}

export default useListShipments;

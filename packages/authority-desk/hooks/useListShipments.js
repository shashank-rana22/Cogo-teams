import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

function useListShipments() {
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
						importer_exporter_id : '1e4b9f43-4863-4e29-a944-8e9e8780e514',
					},
					invoice_value_required: true,
				},
			});
			setData(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		list: data?.list,
		loading,
	};
}

export default useListShipments;

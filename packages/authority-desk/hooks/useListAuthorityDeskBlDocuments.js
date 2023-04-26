import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const emptyData = { list: [], total: 0, total_page: 0 };

function useListAuthorityDeskBlDocuments() {
	const [data, setData] = useState(emptyData?.list);

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_authority_desk_bl_documents',
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						state           : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress', 'completed'],
						is_job_closed   : false,
						document_status : 'requested',
					},
					page       : 1,
					page_limit : 10,
					// additional_methods : ['pagination', 'count_stats', 'invoice_status'],

				},
			});

			setData(res.data || []);

			// if (res.data?.list?.length === 0 && filters.page > 1) {
			// 	setFilters({ ...filters, page: 1 });
			// } else {
			// 	setData(res.data || {});
			// }
		} catch (err) {
			// const mešsage = err?.response?.data?.message || err?.message || 'Something went wrong !!';
			// if (message !== 'canceled') { Toast.error(message); }
			// setData(emptyData);
		}
	}, [trigger]);

	console.log(data, 'data');

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		data,
		loading,
	};
}

export default useListAuthorityDeskBlDocuments;

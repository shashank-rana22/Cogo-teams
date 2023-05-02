import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

function useListAuthorityDeskDocuments({ activeTab, service, bucket }) {
	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : `${service}/list_authority_desk_${activeTab === 'import' ? 'do' : 'bl'}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						state           : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress', 'completed'],
						is_job_closed   : false,
						document_status : bucket,
					},
					page               : 1,
					page_limit         : 10,
					additional_methods : ['pagination', 'count_stats', 'invoice_status', 'ongoing_shipment_stats'],

				},
			});

			setData(res.data || {});

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
	}, [trigger, bucket]);

	console.log(data, 'data');

	useEffect(() => {
		listShipments();
	}, [listShipments, bucket]);

	return {
		data,
		loading,
	};
}

export default useListAuthorityDeskDocuments;

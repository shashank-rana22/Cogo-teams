import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

const shipmentStates = ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress', 'completed'];

function useListAuthorityDeskDocuments({ activeTab, service, bucket, filters }) {
	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : `${service}/list_authority_desk_${activeTab === 'import' ? 'do' : 'bl'}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const { state, is_job_closed, ...restFilters } = filters;
			const res = await trigger({
				params: {
					filters: {
						state           : state || shipmentStates,
						is_job_closed   : is_job_closed === 'yes',
						document_status : bucket,
						...restFilters || {},
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
	}, [listShipments, bucket, filters]);

	return {
		data,
		loading,
	};
}

export default useListAuthorityDeskDocuments;

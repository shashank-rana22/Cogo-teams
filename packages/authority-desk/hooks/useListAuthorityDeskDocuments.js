import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

const shipmentStates = ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress', 'completed'];

function useListAuthorityDeskDocuments({ activeTab, service, bucket, filters }) {
	const [data, setData] = useState(emptyData);

	const [{ loading }, trigger] = useRequest({
		url    : `${service}/list_authority_desk_${activeTab}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const { state, is_job_closed, page, ...restFilters } = filters;

			const res = await trigger({
				params: {
					filters: {
						state           : state || shipmentStates,
						is_job_closed   : is_job_closed === 'yes',
						document_status : bucket,
						...restFilters || {},
					},
					page               : page || 1,
					page_limit         : 10,
					additional_methods : ['pagination', 'count_stats', 'invoice_status', 'ongoing_shipment_stats'],

				},
			});

			setData(res.data || {});
		} catch (err) {
			toastApiError(err);
			setData(emptyData);
		}
	}, [trigger, bucket, filters]);

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		data,
		loading,
	};
}

export default useListAuthorityDeskDocuments;

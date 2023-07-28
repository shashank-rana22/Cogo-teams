import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

const shipmentStates = ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress', 'completed'];
const additional_methods = ['pagination', 'count_stats', 'invoice_status', 'ongoing_shipment_stats'];

const DEFAULT_PAGE = 1;

function useListAuthorityDeskShipments({ activeTab, service, bucket, filters, subApprovedBucket }) {
	const { selected_agent_id, authParams } = useSelector(({ profile }) => profile) || {};
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
						document_status : subApprovedBucket || bucket,
						stakeholder_id  : selected_agent_id || undefined,
						...restFilters || {},
					},
					page       : page || DEFAULT_PAGE,
					page_limit : 10,
					additional_methods,
				},
			});

			setData(res.data || {});
		} catch (err) {
			toastApiError(err);
			setData(emptyData);
		}
	}, [trigger, bucket, filters, subApprovedBucket, selected_agent_id]);

	useEffect(() => {
		listShipments();
	}, [listShipments, authParams]);

	return {
		data,
		loading,
		refetch: listShipments,
	};
}

export default useListAuthorityDeskShipments;

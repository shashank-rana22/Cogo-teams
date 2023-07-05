import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import ToastApiError from '../common/ToastApiError';

const emptyData = { list: [], total: 0, total_page: 0, count_stats: {} };

const DEFAULT_PAGE = 1;
const MAX_ITEM_PER_PAGE = 10;

function useListShipments({ filters = {} }) {
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
						is_backdate_applicable : true,
						shipment_type          : 'ftl_freight',
						state                  : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
						ftl_freight_service    : {
							state: ['init', 'awaiting_service_provider_confirmation',
								'confirmed_by_service_provider', 'cargo_picked_up', 'cargo_dropped'],
						},
						...filters,
					},
					invoice_value_required : false,
					page                   : filters?.page || DEFAULT_PAGE,
					page_limit             : MAX_ITEM_PER_PAGE,
				},
			});
			setData(res.data);
		} catch (err) {
			ToastApiError(err);
		}
	}, [trigger, filters]);

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		data,
		loading,
		refetchShipments: listShipments,
	};
}

export default useListShipments;

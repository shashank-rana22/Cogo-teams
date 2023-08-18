import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import ToastApiError from '../common/ToastApiError';

const DEFAULT_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 10;

function useListKamDeskSurfaceShipment({ activeTab = '' }) {
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_kam_desk_surface_shipments',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(async () => {
		let conditionalFilters = {
			state                        : ['confirmed_by_importer_exporter', 'in_progress'],
			edit_quotation_ftl_shipments : true,
		};

		if (activeTab === 'stakeholder_reallocation') {
			conditionalFilters = {
				state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			};
		}

		try {
			await trigger({
				params: {
					filters: {
						...conditionalFilters,
						...filters,
					},
					shipment_type : 'ftl_freight',
					page          : filters?.page || DEFAULT_PAGE,
					page_limit    : MAX_ITEMS_PER_PAGE,
				},
			});
		} catch (err) {
			ToastApiError(err);
		}
	}, [trigger, filters, activeTab]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {
		data,
		loading,
		filters,
		setFilters,
		refetch: getShipment,
	};
}

export default useListKamDeskSurfaceShipment;

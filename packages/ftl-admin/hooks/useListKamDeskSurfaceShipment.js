import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import ToastApiError from '../common/ToastApiError';

const DEFAULT_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 10;

function useListKamDeskSurfaceShipment() {
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_kam_desk_surface_shipments',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						state           : 'in_progress',
						task_attributes : { task: 'confirmation_of_booking_with_service_provider', status: 'pending' },
						...filters,
					},
					shipment_type : 'ftl_freight',
					page          : DEFAULT_PAGE,
					page_limit    : MAX_ITEMS_PER_PAGE,
				},
			});
		} catch (err) {
			ToastApiError(err);
		}
	}, [trigger, filters]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {
		data,
		loading,
		filters,
		setFilters,
	};
}

export default useListKamDeskSurfaceShipment;

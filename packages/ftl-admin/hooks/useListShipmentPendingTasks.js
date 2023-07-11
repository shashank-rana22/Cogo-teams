import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import ToastApiError from '../common/ToastApiError';

const PENDING_TASK_PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const useListShipmentPendingTasks = () => {
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
		params : {
			filters: {
				status             : 'completed',
				shipment_type      : 'ftl_freight',
				shipment_serial_id : [filters?.serial_id],
			},
			page       : filters?.page || DEFAULT_PAGE,
			page_limit : PENDING_TASK_PAGE_LIMIT,
		},
	}, { manual: true });

	const getPendingTasks = useCallback(() => {
		if (!filters?.serial_id) {
			return;
		}
		(async () => {
			try {
				await trigger();
			} catch (err) {
				ToastApiError(err);
			}
		})();
	}, [trigger, filters]);

	useEffect(() => {
		getPendingTasks();
	}, [getPendingTasks, filters]);

	return {
		loading,
		getPendingTasks,
		data,
		setFilters,
		filters,
	};
};

export default useListShipmentPendingTasks;

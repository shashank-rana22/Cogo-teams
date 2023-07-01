import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useListShipmentPendingTasks = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();
				setData(res?.data || {});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		apiTrigger,
		data,
		setFilters,
		filters,
	};
};

export default useListShipmentPendingTasks;

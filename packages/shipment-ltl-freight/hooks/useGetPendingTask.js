import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useGetPendingTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getTasks = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getTasks();
	}, [getTasks]);

	return {
		loading,
		refetch : getTasks,
		data    : data?.list,
	};
}

export default useGetPendingTasks;

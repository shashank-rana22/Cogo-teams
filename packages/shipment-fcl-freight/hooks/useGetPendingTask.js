import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetPendingTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	shipment_type = '',
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${shipment_type}/list_tasks`,
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

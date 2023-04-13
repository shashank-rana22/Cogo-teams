import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
			},
		},

	}, { manual: true });

	const listDocuments = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments, filters]);

	return {
		loading,
		refetch : listDocuments,
		list    : data,
	};
}

export default useListTasks;

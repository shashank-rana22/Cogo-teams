import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

export default function useListTasks({
	prefix = '',
	defaultFilters = {},
	defaultParams = {},
	params = {},
	filters = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${prefix}/list_tasks`,
		method : 'GET',
		params : {
			...defaultParams,
			...params,
			filters: {
				...filters,
				...defaultFilters,
			},
		},
	}, { manual: true });

	const listTasks = useCallback(() => {
		(async () => {
			trigger({
				params: {
					page_limit: 10,
				},
			});
		})();
	}, [trigger]);

	console.log('tasks', data);
	return {
		list: data?.list || [],
		loading,
		listTasks,
	};
}

import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

export default function useListTasks({
	prefix = '',
	filters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${prefix}/list_tasks`,
		method : 'GET',
	}, { manual: true });

	const listTasks = useCallback(() => {
		(async () => {
			trigger({
				params: {
					...defaultParams,
					filters: {
						...filters,
					},
				},
			});
		})();
	}, [trigger, filters, defaultParams]);

	console.log('tasks', data);
	return {
		list: data?.list || [],
		loading,
		listTasks,
	};
}

import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

export default function useListTasks({ prefix = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${prefix}/list_tasks`,
		method : 'GET',
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

	useEffect(() => {
		listTasks();
	}, [listTasks]);

	console.log('tasks', data);
	return {
		data,
		loading,
	};
}

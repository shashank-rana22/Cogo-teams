import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetPendingTasks({ shipment_data = {}, task_type = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_tasks',
		method : 'GET',
	}, { manual: true });

	const { id = '' } = shipment_data;

	const getTasks = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							task_type,
							status      : 'pending',
							shipment_id : id,
						},

					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, id, task_type]);

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

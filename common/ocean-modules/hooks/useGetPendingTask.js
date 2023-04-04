import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
				Toast.error(getApiErrorString(err));
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

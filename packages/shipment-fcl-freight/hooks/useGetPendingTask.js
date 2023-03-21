import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetPendingTasks({ shipment_data = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_tasks',
		method : 'GET',
	}, { manual: true });

	const { id = '' } = shipment_data;

	const getTasks = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						filters: {
							task_type   : 'upload_document',
							status      : 'pending',
							shipment_id : id,
						},

					},
				}); if (!res.hasError) {
					Toast.error('dsfghj');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, id]);

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

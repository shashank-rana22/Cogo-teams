import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateTask = () => {
	const [{ loading: taskLoading }, taskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const updateTask = async ({ task_id = '', callback = () => {} }) => {
		try {
			await taskTrigger({
				data: {
					id: task_id,
				},
			});
			callback();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		taskLoading,
		updateTask,
	};
};

export default useUpdateTask;

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateShipmentPendingTasksStatus() {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_pending_task_status',
		method : 'POST',
	}, { manual: true });

	const updateTasks = async (payload, callback = () => {}) => {
		try {
			await trigger({
				data: payload,
			});
			callback();
			Toast.success('Request successful');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updatingTasks: loading,
		updateTasks,
	};
}

export default useUpdateShipmentPendingTasksStatus;

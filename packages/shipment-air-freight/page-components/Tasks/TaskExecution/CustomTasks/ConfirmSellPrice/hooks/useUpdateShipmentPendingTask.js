import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentPendingTask = ({
	task,
	refetch = () => {},
	onCancel = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const updateShipmentPendingTask = async () => {
		try {
			await trigger({
				data: { id: task?.id },
			});
			refetch();
			onCancel();
			Toast.success('Successfully updated!');
		} catch (err) {
			Toast.error(toastApiError(err?.data || 'something went wrong!'));
		}
	};

	return {
		updateShipmentPendingTask,
		loading,
	};
};

export default useUpdateShipmentPendingTask;

import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentPendingTask = ({ refetch, onCancel }) => {
	const [{ loading: updateLoading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const updateShipmentPendingTask = async (data) => {
		try {
			await trigger({ data });
			Toast.success('Updated Successfully');
			onCancel();
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateLoading,
		updateShipmentPendingTask,
	};
};

export default useUpdateShipmentPendingTask;

import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateTask = ({
	successMessage = 'Task Updated Successfully!',
	refetch = () => {},
	onCancel = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const apiTrigger = async (task_id) => {
		try {
			const res = await trigger({
				data: {
					id: task_id,
				},
			});
			Toast.success(successMessage);
			refetch();
			onCancel();
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateTask;

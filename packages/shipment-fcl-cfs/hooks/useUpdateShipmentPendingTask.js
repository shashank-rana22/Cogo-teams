import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentPendingTask = ({
	successMessage = 'Task Updated Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			Toast.success(successMessage);

			refetch();

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

export default useUpdateShipmentPendingTask;

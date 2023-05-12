import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePendingTask = ({
	refetch = () => {},
	successMessage = 'Task Completed Successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { loading, apiTrigger };
};

export default useUpdatePendingTask;

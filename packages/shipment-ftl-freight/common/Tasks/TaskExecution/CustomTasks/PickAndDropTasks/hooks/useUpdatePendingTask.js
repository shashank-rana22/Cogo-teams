import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

import { formatPendingTaskData } from '../utils/format-data';

const useUpdatePendingTask = ({ task = {}, doc_type = '', callback = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const updatePendingTask = async (val) => {
		try {
			const formattedTaskData = formatPendingTaskData({ val, task, doc_type });
			await trigger({
				data: formattedTaskData,
			});
			Toast.success('Task Completed Successfully');
			callback();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		data,
		updatePendingTask,
	};
};

export default useUpdatePendingTask;

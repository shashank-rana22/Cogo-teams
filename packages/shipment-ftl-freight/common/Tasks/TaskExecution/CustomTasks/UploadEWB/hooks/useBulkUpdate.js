import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

import { formatBulkUpdateData, formatPendingTaskData } from '../formatData';

const useBulkUpdate = () => {
	const [{ loading: bulkShipmentLoading }, updateBulkShipmentTrigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	const [{ loading }, updateShipmentPendingTaskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const handleBulkPayload = async ({ val, shipment_data }) => {
		try {
			const formatedLRData = formatBulkUpdateData({ val, shipment_data });
			const response = await updateBulkShipmentTrigger({
				data: { ...formatedLRData },
			});
			return response;
		} catch (e) {
			toastApiError(e);
			return null;
		}
	};

	const handlePendingTask = async ({ val, task }) => {
		try {
			const formatedTaskData = formatPendingTaskData({ val, task });
			const response = await updateShipmentPendingTaskTrigger({
				data: { ...formatedTaskData },
			});
			return response;
		} catch (e) {
			toastApiError(e);
			return null;
		}
	};

	return {
		bulkShipmentLoading,
		loading,
		handleBulkPayload,
		handlePendingTask,
	};
};
export default useBulkUpdate;

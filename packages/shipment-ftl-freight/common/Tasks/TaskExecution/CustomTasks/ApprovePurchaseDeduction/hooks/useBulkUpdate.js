import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { formatBulkPayloadData } from '../formatData';

const useBulkUpdate = () => {
	const [{ loading: updateBulkShipmentLoading }, updateBulkShipmentTrigger] = useRequest({
		url    : '/update_shipment_line_items_deduction',
		method : 'POST',
	});

	const [{ loading: updateShipmentPendingTaskLoading }, updateShipmentPendingTaskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const handleBulkPayload = async ({ selected, shipment_data, watchCN }) => {
		try {
			const formattedData = formatBulkPayloadData({
				selected,
				shipment_data,
				watchCN,
			});
			const response = await updateBulkShipmentTrigger({
				data: { ...formattedData },
			});
			return response;
		} catch (e) {
			Toast.error(getApiErrorString(e?.data) || 'Something went wrong !! ');
			return null;
		}
	};

	const handlePendingTask = async ({ task = {} }) => {
		try {
			const response = await updateShipmentPendingTaskTrigger({
				data: { id: task?.id },
			});
			return response;
		} catch (e) {
			const finalErrorMsg = {
				message: e?.data?.message?.replace('Message ', ''),
			};
			Toast.error(
				getApiErrorString(finalErrorMsg) || 'Something went wrong !! ',
			);
			return null;
		}
	};

	return {
		handleBulkPayload,
		handlePendingTask,
		updateBulkShipmentLoading,
		updateShipmentPendingTaskLoading,
	};
};
export default useBulkUpdate;

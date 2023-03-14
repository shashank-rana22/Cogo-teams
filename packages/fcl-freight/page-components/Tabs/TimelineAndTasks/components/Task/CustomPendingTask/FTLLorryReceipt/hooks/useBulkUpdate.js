import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { formatLRData, formatTaskData } from '../formatLRData';

const useBulkUpdate = () => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateBulkShipment = useRequest(
		'post',
		false,
		scope,
	)('/bulk_update_shipment_services');

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const handleBulkPayload = async ({ val, shipment_data }) => {
		try {
			const formatedLRData = formatLRData({ val, shipment_data });
			const response = await updateBulkShipment.trigger({
				data: { ...formatedLRData },
			});
			return response;
		} catch (e) {
			toast.error(getApiErrorString(e?.data) || 'Something went wrong !! ');
			return null;
		}
	};

	const handlePendingTask = async ({ val, task }) => {
		try {
			const formatedTaskData = formatTaskData({ val, task });
			const response = await updateShipmentPendingTask.trigger({
				data: { ...formatedTaskData },
			});
			return response;
		} catch (e) {
			toast.error(getApiErrorString(e?.data) || 'Something went wrong !! ');
			return null;
		}
	};

	return {
		updateBulkShipment,
		handleBulkPayload,
		updateShipmentPendingTask,
		handlePendingTask,
	};
};
export default useBulkUpdate;

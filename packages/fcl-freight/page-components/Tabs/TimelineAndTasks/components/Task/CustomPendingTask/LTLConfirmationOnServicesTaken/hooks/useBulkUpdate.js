import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import {
	formatBulkUpdateData,
	formatUpdateShipmentPendingTaskData,
} from '../formatData';

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

	const handleBulkPayload = async ({ task, val }) => {
		try {
			const bulkUpdateData = formatBulkUpdateData({ task, val: { ...val } });
			const res = await updateBulkShipment.trigger({
				data: bulkUpdateData,
			});
			return res;
		} catch (e) {
			toast.error(getApiErrorString(e?.data) || 'Something went wrong !! ');
			return null;
		}
	};

	const handlePendingTask = async ({ task, val }) => {
		try {
			const updateTaskData = formatUpdateShipmentPendingTaskData({ task, val });
			const res = await updateShipmentPendingTask.trigger({
				data: updateTaskData,
			});
			toast.success('Task Completed Successfully');
			return res;
		} catch (e) {
			toast.error(getApiErrorString(e?.data) || 'Something went wrong !! ');
			return null;
		}
	};

	return {
		handleBulkPayload,
		handlePendingTask,
		loading: updateBulkShipment.loading || updateShipmentPendingTask.loading,
	};
};
export default useBulkUpdate;

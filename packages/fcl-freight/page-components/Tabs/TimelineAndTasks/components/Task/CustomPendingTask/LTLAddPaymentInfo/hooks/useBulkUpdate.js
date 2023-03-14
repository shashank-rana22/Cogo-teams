import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { formatTaskData } from '../utils/formatData';

const useBulkUpdate = ({
	shipment_data,
	refetch = () => {},
	onCancel = () => {},
}) => {
	const { scope } = useScope();

	const { loading, data, trigger } = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const updateTask = async ({ task, val }) => {
		try {
			const formattedData = formatTaskData({ task, val, shipment_data });
			await trigger({
				data: formattedData,
			});
			toast.success('Task completed successfully');

			refetch();
			onCancel();
		} catch (error) {
			toast.error(getApiErrorString(error?.data) || 'Something went wrong');
		}
	};

	return {
		data,
		loading,
		updateTask,
	};
};

export default useBulkUpdate;

import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { formatTaskData } from '../utils/formatData';

const useCompleteTask = () => {
	const { scope } = useScope();

	const { loading, data, trigger } = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const updateTask = async ({ task = {}, val = {}, callback = () => {} }) => {
		try {
			const formattedData = formatTaskData({ task, val });
			await trigger({
				data: formattedData,
			});
			toast.success('Task Completed Successfully');

			callback();
		} catch (error) {
			toast.error(getApiErrorString(error?.data) || 'Something Went Wrong');
		}
	};

	return {
		data,
		loading,
		updateTask,
	};
};

export default useCompleteTask;

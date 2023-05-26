import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { getApiErrorString } from '@cogoport/front/utils';

const useTaskUpdate = ({ task, onCancel = () => {}, refetch = () => {} }) => {
	const scope = useSelector(({ general }) => general?.scope);

	const { trigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const handleTaskUpdate = async () => {
		try {
			await trigger({
				data: {
					id: task.id,
				},
			});
			toast.success('Task Status Updated Successfully');
			onCancel();
			refetch();
		} catch (error) {
			toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		taskLoading: loading,
		handleTaskUpdate,
	};
};
export default useTaskUpdate;

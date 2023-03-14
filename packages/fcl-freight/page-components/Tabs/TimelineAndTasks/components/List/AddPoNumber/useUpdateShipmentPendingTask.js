import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';

const useUpdateShipmentPendingTask = ({
	setOpen = () => {},
	refetch = () => {},
	task = {},
}) => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateShipmentAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const onCreate = async (values) => {
		try {
			await updateShipmentAPI.trigger({
				data: {
					id: task?.id,
					status: 'pending',
					remarks: [values?.remarks],
				},
			});
			setOpen(false);
			refetch();
			toast.success('Successfully marked!');
		} catch (err) {
			toast.error(err?.data);
		}
	};

	return {
		onCreate,
		loading: updateShipmentAPI.loading,
	};
};

export default useUpdateShipmentPendingTask;

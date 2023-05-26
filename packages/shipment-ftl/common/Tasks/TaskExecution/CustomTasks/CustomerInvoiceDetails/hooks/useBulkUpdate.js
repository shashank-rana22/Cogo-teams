import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { getApiErrorString } from '@cogoport/front/utils';

const useBulkUpdate = () => {
	const scope = useSelector(({ general }) => general?.scope);

	const { trigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/bulk_update_shipment_services');

	const handleBulkUpdate = async ({
		values,
		service_id,
		handleTaskUpdate = () => {},
	}) => {
		const payload = {
			service: 'ftl_freight',
			service_data: [{ service_id, data: values }],
		};

		try {
			await trigger({
				data: payload,
			});
			toast.success('Task Completed Successfully');
			handleTaskUpdate();
		} catch (error) {
			toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		loading,
		handleBulkUpdate,
	};
};
export default useBulkUpdate;

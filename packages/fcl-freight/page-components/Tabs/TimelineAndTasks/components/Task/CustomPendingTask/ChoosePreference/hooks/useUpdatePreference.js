import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';
import { useRequest } from '@cogo/commons/hooks';
import { getApiErrorString } from '@cogoport/front/utils';

const useUpdatePrefrence = ({
	item = {},
	handleUpdateTask = () => {},
	serviceProvider,
}) => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateApi = useRequest(
		'post',
		false,
		scope,
	)('update_shipment_booking_confirmation_preference');
	const handleProceed = async () => {
		const payload = {
			selected_priority: item.priority,
			id: item.preference_id,
		};
		try {
			const res = await updateApi.trigger({ data: payload });
			if (!res?.hasError) {
				await handleUpdateTask(item, serviceProvider);
			}
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		handleProceed,
		loading: updateApi.loading,
	};
};

export default useUpdatePrefrence;

import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { getApiErrorString } from '@cogoport/front/utils';
import { useRequest } from '@cogo/commons/hooks';

const useUpdateBookingPreference = () => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateApi = useRequest(
		'post',
		false,
		scope,
	)('update_shipment_booking_confirmation_preference');

	const updateConfirmation = async (item) => {
		const payload = {
			selected_priority: item.priority,
			id: item.preference_id,
		};
		try {
			await updateApi.trigger({ data: payload });
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
			console.log(err);
		}
	};
	return {
		updateConfirmation,
	};
};

export default useUpdateBookingPreference;

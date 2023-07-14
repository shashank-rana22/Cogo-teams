import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateShipmentBookingConfirmationPreferences = ({
	successMessage = 'Updated Successfully!',
	setStep = () => {},
}) => {
	const ONE = 1;
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_booking_confirmation_preferences',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = useCallback(
		async (item) => {
			const SELECTED_PRIORITY = [];
			console.log(new Date(), 'hit_time_0');
			item.forEach((priority) => (SELECTED_PRIORITY.push({
				id                : priority.preference_id,
				selected_priority : priority.priority,
			})));
			try {
				const res = await trigger({ data: { selected_priorities: SELECTED_PRIORITY } });

				if (!res.hasError) {
					Toast.success(successMessage);
					console.log(new Date(), 'hit_time_1');
					setStep((prev) => prev + ONE);
				}
			} catch (err) {
				toastApiError(err);
			}
		},
		[setStep, trigger, successMessage],
	);
	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentBookingConfirmationPreferences;

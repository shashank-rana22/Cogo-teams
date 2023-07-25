import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const ONE = 1;

const useUpdateShipmentBookingConfirmationPreferences = ({
	successMessage = 'Updated Successfully!',
	handleUpdateTask = () => {},
	setStep = () => {},
	setSelectedServiceProvider = () => {},
	source = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'bulk_update_shipment_booking_confirmation_preferences',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = 	async (item) => {
		const SELECTED_PRIORITY = [];
		item.forEach((priority) => (SELECTED_PRIORITY.push({
			id                : priority.preference_id,
			selected_priority : priority.priority,
		})));
		try {
			const res = await trigger({ data: { selected_priorities: SELECTED_PRIORITY } });

			if (!res.hasError) {
				Toast.success(successMessage);
				handleUpdateTask(item[GLOBAL_CONSTANTS.zeroth_index]);
			}

			if (source === 'upload_booking_note') {
				setSelectedServiceProvider((prev) => [...prev, item]);
				setStep((prev) => prev + ONE);
			}
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentBookingConfirmationPreferences;

import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const LIST_PREFERENCE_RATE_STEP = 1;
const useUpdateBookingPreference = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_confirmation_preference',
		method : 'POST',
	}, { manual: true });

	const updateConfirmation = async ({
		payload,
		updateShipmentPendingTask = () => {},
		refetchList = () => {},
		setStep = () => {},
		shipment_id = undefined,
		value,
	}) => {
		try {
			await trigger({ data: payload });
			updateShipmentPendingTask(value);
			refetchList(shipment_id);
			setStep(LIST_PREFERENCE_RATE_STEP);
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		updateConfirmation,
		updateLoading: loading,
	};
};

export default useUpdateBookingPreference;

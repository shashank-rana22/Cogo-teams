import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateShipmentBookingConfirmationPreferences = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_confirmation_preference',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: val });

			Toast.success(successMessage);

			refetch();
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

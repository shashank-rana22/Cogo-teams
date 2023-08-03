import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

export default function useUpdateShipmentBookingParamter({
	refetch = () => {},
	successMessage = 'Booking params have been changed. Please check the quotation.',
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_parameter',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: payload });

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
}

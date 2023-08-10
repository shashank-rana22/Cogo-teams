import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateBookingPreferences = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_confirmation_preference',
		method : 'POST',
	});

	const apiTrigger = async (item, service_providers) => {
		const val = {
			selected_priority : item.priority,
			id                : item.preference_id,
			service_providers,
		};
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

export default useUpdateBookingPreferences;

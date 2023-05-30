import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

function useUpdateBookingParameter({
	refetch = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_parameter',
		method : 'POST',
	}, { manual: true });

	const updateBookingParameter = async (val) => {
		try {
			const res = await trigger({ data: val });
			if (!res?.hasError) {
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateBookingParameter,
	};
}

export default useUpdateBookingParameter;

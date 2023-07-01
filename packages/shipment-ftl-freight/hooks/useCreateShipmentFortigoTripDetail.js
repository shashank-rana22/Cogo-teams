import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useCreateShipmentFortigoTripDetail = ({
	refetch = () => {},
	successMessage = 'Successfully Created',
} = {}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_fortigo_trip_detail',
		method : 'POST',
	}, { manual: true });

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
		apiTrigger,
		loading,
	};
};

export default useCreateShipmentFortigoTripDetail;

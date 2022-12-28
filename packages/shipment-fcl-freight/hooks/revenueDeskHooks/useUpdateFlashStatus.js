import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateFlashBookingRate = ({
	data,
	setShowBookingOption = () => {},
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url:
		'/create_shipment_flash_booking_rate',
		method: 'post',
	}, { manual: true });

	const handleFlashDirect = async () => {
		try {
			const params = {
				shipment_id  : data?.id,
				service_type : 'fcl_freight_service',
			};

			const res = await trigger({ data: params });

			if (!res.hasError) {
				setShowBookingOption(false);
				Toast.success('Successfully Flashed');
				refetch();
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		handleFlashDirect,
		flashDirectLoading: loading,
	};
};

export default useCreateFlashBookingRate;

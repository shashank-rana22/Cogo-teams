import {useRequest} from "@cogoport/request"
import { Toast } from '@cogoport/components'

const useCreateFlashBookingRate = ({
	data,
	setShowBookingOption = () => {},
	refetch = () => {},
}) => {
	

	 const [{data:FlashRateData, loading: loading, error = error },trigger]=useRequest('/create_shipment_flash_booking_rate',{manual:true})

	const handleFlashDirect = async () => {
		try {
			const params = {
				shipment_id: data?.id,
				service_type: 'fcl_freight_service',
			};

			const res = await trigger({ data: params });

			if (!res.hasError) {
				setShowBookingOption(false);
				Toast.success('Successfully Flashed');
				refetch();
			}
		} catch (err) {
			Toast(err);
		}
	};

	return {
		handleFlashDirect,
		flashDirectLoading: loading,
	};
};

export default useCreateFlashBookingRate;
import { useRequest } from '@cogoport/request';

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({ data }) => {
		try {
			await trigger({
				data: {
					is_create_required  : false,
					sourced_by_id       : data?.source_id,
					service_provider_id : data?.service_provider_id,
				},
			});
		} catch (e) {
			// console.log('Something went wrong');
		}
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;

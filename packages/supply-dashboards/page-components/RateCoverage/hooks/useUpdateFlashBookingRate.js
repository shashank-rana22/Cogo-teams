import { useRequest } from '@cogoport/request';

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({ data }) => {
		try {
			const resp = await trigger({
				data: {
					is_create_required : false,
					shipment_id        : data?.shipment_id,
					id                 : data?.source_id,
				},
			});
			if (resp) { return resp?.status; }
		} catch (e) {
			// console.log('Something went wrong');
		}
		return null;
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;

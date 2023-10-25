import { useRequest } from '@cogoport/request';

const useListShipmentFlashBookingRates = ({ source_id }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/list_shipment_flash_booking_rates',
		method : 'get',
	}, { manual: true });

	const shipmentFlashBookingRates = async () => {
		try {
			await trigger({
				params: {
					filters: {
						id: source_id,
					},
					is_indicative_price_required: true,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		data,
		shipmentFlashBookingRates,
	};
};

export default useListShipmentFlashBookingRates;

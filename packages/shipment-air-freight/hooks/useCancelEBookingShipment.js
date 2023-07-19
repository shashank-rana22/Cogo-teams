import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useCancelEBookingShipment = (shipment_data) => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/e-booking',
			method  : 'PUT',
			authKey : 'put_air_coe_e_booking_cancel',
		},
	);

	const mainServiceData = (shipment_data?.all_services || []).find((service) => (
		service?.service_type === 'air_freight_service'
	));

	const cancelEBooking = async () => {
		const payload = {
			serviceId: mainServiceData?.id,
		};
		try {
			await trigger({
				data: {
					req: {
						...payload,
					},
				},
			});

			Toast.success(
				'Shipment with airline has been successfully cancelled.',
			);
		} catch (err) {
			toastApiError(err || ['Something went wrong.']);
		}
	};

	return {
		loading,
		cancelEBooking,
	};
};

export default useCancelEBookingShipment;

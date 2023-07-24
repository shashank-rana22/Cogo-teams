import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useCreateEBooking = ({
	setShowBookingStatus = () => {},
	item = {},
	serviceProvidersData = [],
	mainServiceData = {},
}) => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/e-booking',
			method  : 'POST',
			authKey : 'post_air_coe_e_booking',
		},
	);

	(serviceProvidersData).forEach((itm) => {
		const value = itm;
		if (item?.priority === value?.priority) {
			value.booking_source = 'e_booking';
		}
	});

	const createEBooking = async (handleOnClick = () => {}, validity = {}) => {
		const payload = {
			flightUuid : validity?.flight_uuid,
			serviceId  : mainServiceData?.id,
			rateId     : validity?.external_rate_id,
		};
		try {
			const res = await trigger({
				data: {
					req: { ...payload },
				},
			});
			if (res?.data?.status === 'PENDING_DELIVERY') {
				handleOnClick();
				Toast.success(
					'Booking with airline has been successfully placed.',
				);
			}
			if (res?.data?.status === 'FAILED') {
				setShowBookingStatus(true);
			}
		} catch (err) {
			setShowBookingStatus(true);
			toastApiError(err);
		}
	};

	return {
		loading,
		createEBooking,
	};
};

export default useCreateEBooking;

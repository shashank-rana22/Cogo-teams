import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListBookingPreference = ({ data, selectedService }) => {
	const [view, setView] = useState(false);
	const [bookingLoading, setBookingLoading] = useState(false);
	const [show, setShow] = useState(false);

	const [{ data: bookingData }, trigger] = useRequest(
		'/list_shipment_booking_confirmation_preferences',
		{ manual: true },
	);

	const handleBooking = async (shipment_id) => {
		setView(true);
		setBookingLoading(true);
		try {
			const params = {
				filters: {
					shipment_id,
					service_id   : selectedService?.id || undefined,
					service_type : selectedService?.service_type || undefined,
				},
			};

			const res = await trigger({ params });
			if (!res.hasError) {
				setBookingLoading(false);
			}
		} catch (error) {
			setBookingLoading(false);
			Toast.error('Something went wrong!');
		}
		setBookingLoading(false);
	};

	useEffect(() => {
		if (data?.id && view) {
			handleBooking(data?.id);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view, selectedService?.id]);

	return {
		handleBooking,
		bookingData,
		bookingLoading,
		view,
		setShow,
		show,
		setView,
	};
};

export default useListBookingPreference;

import { isEmpty } from '@cogoport/utils';

import BookingPreferenceCard from '../UploadBookingNote/components/Step0/BookingPreferenceCard';

function ConfirmFreightBooking({ getApisData = {} }) {
	const { list_shipment_booking_confirmation_preferences: list = [] } = getApisData;

	const selectedPriority = list?.find((item) => item?.priority === item?.selected_priority);

	if (isEmpty(selectedPriority)) {
		return null;
	}

	return <BookingPreferenceCard item={selectedPriority} isProceedEnabled={false} />;
}

export default ConfirmFreightBooking;

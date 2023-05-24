import formatBillOfLading from './format-bill-of-lading';
import formatBookingNote from './format-booking-note';
import formatContainerDetails from './format-container-details';
import formatShippingInstructions from './format-shipping-intructions';

const formatters = {
	booking_note         : formatBookingNote,
	bill_of_lading       : formatBillOfLading,
	shipping_instruction : formatShippingInstructions,
	container_details    : formatContainerDetails,
};

export default formatters;

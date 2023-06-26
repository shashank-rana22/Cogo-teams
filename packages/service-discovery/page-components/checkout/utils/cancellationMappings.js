const CANCELLATION_MAPPINGS = {
	initial_booking          : 'SID created to Booking Confirmation',
	booking_confirmation     : 'Booking Confirmation to Booking Procured',
	booking_note_procurement : 'Booking Procured to Vessel Departure',
	booking_placed           : 'Booking Confirmation to Vessel Departure',
	'<='                     : 'Days within Departure',
	'<'                      : 'Days within Departure',
	'>'                      : 'Days before Departure',
	'>='                     : 'Days before Departure',
};

export default CANCELLATION_MAPPINGS;

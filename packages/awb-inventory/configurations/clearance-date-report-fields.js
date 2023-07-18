export const ClearanceDateReportFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 1.6,
			func  : 'handleAirline',
		},
		{
			key   : 'airport',
			label : 'Region',
			span  : 1.8,
			func  : 'handleAirport',
		},
		{
			key   : 'destination_location',
			label : 'Destination Location',
			span  : 1.8,
			func  : 'handleDestLocation',
		},
		{
			key   : 'awb_number',
			label : 'AWB Number',
			span  : 1.2,
			func  : 'handleAwbNumber',
		},
		{
			key   : 'custom_clearance_date',
			label : 'Custom Clearance Date',
			span  : 1,
			func  : 'handleCustomClearanceDate',
		},
		{
			key   : 'booking_date',
			label : 'Booking Date',
			span  : 1.4,
			func  : 'handleBookingDate',
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 1.2,
			func  : 'handleAction',
		},
	],
};

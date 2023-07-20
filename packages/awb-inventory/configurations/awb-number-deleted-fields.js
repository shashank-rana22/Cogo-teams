export const AwbNumberDeletedFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 1,
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
			span  : 1.6,
			func  : 'handleDestLocation',
		},
		{
			key   : 'awb_type',
			label : 'Awb Type',
			span  : 1.6,
			func  : 'handleAwbType',
		},
		{
			key   : 'service_provider',
			label : 'Service Provider',
			span  : 1,
			func  : 'handleServiceProvider',
		},
		{
			key   : 'iata_code',
			label : 'IATA Code',
			span  : 1,
			func  : 'handleIataCode',
		},
		{
			key   : 'awb_number',
			label : 'AWB Number',
			span  : 1,
			func  : 'handleAwbNumber',
		},
		{
			key   : 'shipments',
			label : 'SID Created',
			span  : 1,
			func  : 'handleShipments',
		},
		{
			key   : 'booking_date',
			label : 'Booking Date',
			span  : 1,
			func  : 'handleBookingDate',
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 1,
			func  : 'handleAction',
		},
	],
};

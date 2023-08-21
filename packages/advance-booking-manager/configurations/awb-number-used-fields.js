export const AwbNumberUsedFields = {
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
			key    : 'destination_location',
			label  : 'Destination Location',
			span   : 1.8,
			render : (singleItem) => singleItem?.destinationAirport,
		},
		{
			key    : 'iata_code',
			label  : 'IATA Code',
			span   : 1,
			render : (singleItem) => singleItem?.iataCode,
		},
		{
			key    : 'awb_number',
			label  : 'AWB Number',
			span   : 1,
			render : (singleItem) => singleItem?.awbNumber,
		},
		{
			key   : 'shipments',
			label : 'SID Created',
			span  : 1,
			func  : 'handleShipments',
		},
		{
			key    : 'procured_by',
			label  : 'Procured Agent',
			span   : 1.2,
			render : (singleItem) => singleItem?.procuredByName,
		},
		{
			key    : 'service_provider',
			label  : 'Service Provider',
			span   : 1.2,
			render : (singleItem) => singleItem?.serviceProviderName,
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
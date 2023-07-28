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
			key    : 'destination_location',
			label  : 'Destination Location',
			span   : 1.6,
			render : (singleItem) => singleItem?.destinationAirport,
		},
		{
			key    : 'awb_type',
			label  : 'Awb Type',
			span   : 1.6,
			render : (singleItem) => singleItem?.awbType,
		},
		{
			key    : 'service_provider',
			label  : 'Service Provider',
			span   : 1,
			render : (singleItem) => singleItem?.serviceProviderName,
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

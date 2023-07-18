export const AwbNumberUsedFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 1.2,
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
			key   : 'iata_code',
			label : 'IATA Code',
			span  : 1,
			func  : 'handleIataCode',
		},
		{
			key   : 'awb_number',
			label : 'AWB Number',
			span  : 1.4,
			func  : 'handleAwbNumber',
		},
		{
			key   : 'shipments',
			label : 'SID Created',
			span  : 1,
			func  : 'handleShipments',
		},
		{
			key   : 'procured_by',
			label : 'Procured Agent',
			span  : 1.2,
			func  : 'handleAgent',
		},
		{
			key   : 'service_provider',
			label : 'Service Provider',
			span  : 1.4,
			func  : 'handleServiceProvider',
		},
		{
			key   : 'procured_date',
			label : 'Procured Date',
			span  : 1.2,
			func  : 'handleDate',
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 1.2,
			func  : 'handleAction',
		},
	],
};

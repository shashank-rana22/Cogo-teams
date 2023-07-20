export const AwbNumberFields = {
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
			key   : 'procured_by',
			label : 'Procured Agent',
			span  : 1,
			func  : 'handleAgent',
		},
		{
			key   : 'service_provider',
			label : 'Service Provider',
			span  : 1.4,
			func  : 'handleServiceProvider',
		},
		{
			key   : 'validity_expiry_date',
			label : 'AWB Validity End',
			span  : 1,
			func  : 'handleValidityDate',
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 1.2,
			func  : 'handleAction',
		},
	],
};

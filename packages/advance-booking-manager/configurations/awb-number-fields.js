export const AwbNumberFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 1.8,
			func  : 'handleAirline',
		},
		{
			key   : 'airport',
			label : 'Region',
			span  : 2,
			func  : 'handleAirport',
		},
		{
			key    : 'destination_location',
			label  : 'Destination Location',
			span   : 2,
			render : (singleItem) => singleItem?.destinationAirport,
		},
		{
			key    : 'awb_number',
			label  : 'AWB Number',
			span   : 1.2,
			render : (singleItem) => singleItem?.awbNumber,
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
			span   : 1.4,
			render : (singleItem) => singleItem?.serviceProviderName,
		},
		{
			key   : 'validity_expiry_date',
			label : 'AWB Validity End',
			span  : 1.2,
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

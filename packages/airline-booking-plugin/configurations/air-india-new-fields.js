export const airIndiaNewFields = (t) => ([
	{
		key   : 'source',
		label : t('airlineBookingPlugin:source_label'),
		span  : 1.4,
		func  : 'handleSource',
	},
	{
		key   : 'destination',
		label : t('airlineBookingPlugin:destination_label'),
		span  : 1.4,
		func  : 'handleDestination',
	},
	{
		key   : 'commodity',
		label : t('airlineBookingPlugin:commodity_label'),
		span  : 1.4,
	},
	{
		key   : 'number_of_pieces',
		label : t('airlineBookingPlugin:number_of_pieces_label'),
		span  : 1.3,
	},
	{
		key   : 'weight',
		label : t('airlineBookingPlugin:weight_label'),
		span  : 1.3,
	},
	{
		key   : 'volume',
		label : t('airlineBookingPlugin:volume_label'),
		span  : 1.3,
	},
	{
		key   : 'flight_number',
		label : t('airlineBookingPlugin:flight_number_label'),
		span  : 1.3,
	},
	{
		key   : 'flight_date',
		label : t('airlineBookingPlugin:flight_date_label'),
		span  : 1.3,
		func  : 'handleFlightDate',
	},
	{
		key   : 'plugin-action',
		label : t('airlineBookingPlugin:action_label'),
		span  : 1.3,
		func  : 'handleAction',
	},
]);

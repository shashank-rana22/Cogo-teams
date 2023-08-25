export const airIndiaCompletedFields = (t = () => {}) => ([
	{
		key   : 'source',
		label : t('airlineBookingPlugin:source_label'),
		span  : 1.2,
		func  : 'handleSource',
	},
	{
		key   : 'destination',
		label : t('airlineBookingPlugin:destination_label'),
		span  : 1.2,
		func  : 'handleDestination',
	},
	{
		key   : 'commodity',
		label : t('airlineBookingPlugin:commodity_label'),
		span  : 1.2,
	},
	{
		key   : 'number_of_pieces',
		label : t('airlineBookingPlugin:number_of_pieces_label'),
		span  : 1,
	},
	{
		key   : 'weight',
		label : t('airlineBookingPlugin:weight_label'),
		span  : 1,
	},
	{
		key   : 'volume',
		label : t('airlineBookingPlugin:volume_label'),
		span  : 1,
	},
	{
		key   : 'flight_number',
		label : t('airlineBookingPlugin:flight_number_label'),
		span  : 1,
	},
	{
		key   : 'flight_date',
		label : t('airlineBookingPlugin:flight_date_label'),
		span  : 1,
		func  : 'handleFlightDate',
	},
	{
		key   : 'air_awb_number',
		label : t('airlineBookingPlugin:air_awb_number_label'),
		span  : 1.5,
		func  : 'handleAWBNumber',
	},
	{
		key   : 'flight_status',
		label : t('airlineBookingPlugin:flight_status_label'),
		span  : 0.9,
		func  : 'handleFlightStatus',
	},
	{
		key   : 'plugin-action',
		label : t('airlineBookingPlugin:action_label'),
		span  : 1,
		func  : 'handleAction',
	},
]);

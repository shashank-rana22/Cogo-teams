import { upperCase } from '@cogoport/utils';

export const pluginHeader = (t) => ([
	{
		label : upperCase(t('airlineBookingPlugin:source_label')),
		name  : 'source',
		key   : 'source',
		span  : 1.7,
	},
	{
		label : upperCase(t('airlineBookingPlugin:destination_label')),
		name  : 'destination',
		key   : 'destination',
		span  : 1.7,
	},
	{
		label : upperCase(t('airlineBookingPlugin:commodity_label')),
		name  : 'commodity',
		key   : 'commodity',
		span  : 1.5,
	},
	{
		label : upperCase(t('airlineBookingPlugin:number_of_pieces_label')),
		name  : 'number_of_pieces',
		key   : 'number_of_pieces',
		span  : 1.4,
	},
	{
		label : upperCase(t('airlineBookingPlugin:weight_label')),
		name  : 'weight',
		key   : 'weight',
		span  : 1.4,
	},
	{
		label : upperCase(t('airlineBookingPlugin:volume_label')),
		name  : 'volume',
		key   : 'volume',
		span  : 1.4,
	},
	{
		label : upperCase(t('airlineBookingPlugin:flight_number_label')),
		name  : 'flight_number',
		key   : 'flight_number',
		span  : 1.4,
	},
	{
		label : upperCase(t('airlineBookingPlugin:flight_date_label')),
		name  : 'flight_date',
		key   : 'flight_date',
		span  : 1.5,
		func  : 'handleFlightDate',
	},
]);

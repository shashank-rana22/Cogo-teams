export const bookingControl = (setLocationData = () => {}, edit = false, t = () => {}) => [
	{
		name        : 'source',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		initialCall : true,
		placeholder : t('airlineBookingPlugin:source_placeholder'),
		span        : 1.7,
		onChange    : (val, obj) => setLocationData((pre) => ({ ...pre, source: obj?.name })),
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: t('airlineBookingPlugin:source_rules'),
		},
	},
	{
		name        : 'destination',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		initialCall : true,
		placeholder : t('airlineBookingPlugin:destination_placeholder'),
		span        : 1.7,
		onChange    : (val, obj) => setLocationData((pre) => ({ ...pre, destination: obj?.name })),
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: t('airlineBookingPlugin:destination_rules'),
		},
	},
	{
		name        : 'commodity',
		type        : 'text',
		placeholder : t('airlineBookingPlugin:commodity_placeholder'),
		span        : 1.5,
		rules       : {
			required: t('airlineBookingPlugin:commodity_rules'),
		},
	},
	{
		name        : 'number_of_pieces',
		type        : 'number',
		placeholder : t('airlineBookingPlugin:number_of_pieces_placeholder'),
		span        : 1.4,
		rules       : {
			required: t('airlineBookingPlugin:number_of_pieces_rules'),
		},
	},
	{
		name        : 'weight',
		type        : 'number',
		placeholder : t('airlineBookingPlugin:weight_placeholder'),
		span        : 1.4,
		rules       : {
			required: t('airlineBookingPlugin:weight_rules'),
		},
	},
	{
		name        : 'volume',
		type        : 'number',
		placeholder : t('airlineBookingPlugin:volume_placeholder'),
		span        : 1.4,
		rules       : {
			required: t('airlineBookingPlugin:volume_rules'),
		},
	},
	{
		name        : 'flight_number',
		type        : 'text',
		placeholder : t('airlineBookingPlugin:flight_number_placeholder'),
		span        : 1.4,
		rules       : {
			required: t('airlineBookingPlugin:flight_number_rules'),
		},
	},
	{
		name        : 'flight_date',
		type        : edit ? 'date_picker' : 'date_range',
		placeholder : t('airlineBookingPlugin:flight_date_placeholder'),
		span        : 2,
		minDate     : new Date(),
		rules       : {
			required: t('airlineBookingPlugin:flight_date_rules'),
		},
	},
];

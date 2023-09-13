const airFreightLocalControls = (t = () => {}) => [
	{
		name           : 'airport_id',
		label          : t('airBookingDesk:label_airport'),
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'airport',
				],
			},
		},
		isClearable : true,
		span        : 6,
	},
	{
		name        : 'trade_type',
		label       : t('airBookingDesk:label_trade_type'),
		type        : 'select',
		placeholder : t('airBookingDesk:placeholder_trade_type'),
		className   : 'primary md',
		options     : [
			{
				label : t('airBookingDesk:trade_type_import'),
				value : 'import',
			},
			{
				label : t('airBookingDesk:trade_type_export'),
				value : 'export',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		name        : 'state',
		label       : t('airBookingDesk:label_state'),
		type        : 'select',
		placeholder : t('airBookingDesk:placeholder_state'),
		options     : [
			{
				label : t('airBookingDesk:state_awaiting_confirmation'),
				value : 'awaiting_service_provider_confirmation',
			},
			{
				label : t('airBookingDesk:state_confirmed_by_service_provider'),
				value : 'confirmed_by_service_provider',
			},
		],
		isClearable : true,
		span        : 6,
	},
];
export default airFreightLocalControls;

const getAirDomesticTreminalcontrols = () => [
	{
		name        : 'service_provider_id',
		type        : 'async_select',
		label       : 'Service Provider',
		placeholder : 'Select Service Provider',
		asyncKey    : 'organizations',
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'airport_id',
		label       : 'Airport',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'airline_id',
		label       : 'Airline',
		type        : 'async_select',
		asyncKey    : 'list_operators',
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name    : 'terminal_charge_type',
		label   : 'Charge type',
		type    : 'select',
		options : [
			{
				label : 'Inbound',
				value : 'inbound',
			},
			{
				label : 'Outbound',
				value : 'outbound',
			},
		],
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
];
export default getAirDomesticTreminalcontrols;

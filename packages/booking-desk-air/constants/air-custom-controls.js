const airCustomControls = [
	{
		name           : 'airport_id',
		label          : 'Airport',
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
		label       : 'Trade Type',
		type        : 'select',
		placeholder : 'Select Trade type',
		className   : 'primary md',
		options     : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'select',
		placeholder : 'Select State',
		options     : [
			{
				label : 'Awaiting service provider confirmation',
				value : 'awaiting_service_provider_confirmation',
			},
			{
				label : 'Confirmed by service provider',
				value : 'confirmed_by_service_provider',
			},
			{
				label : 'Customs cleared',
				value : 'customs_cleared',
			},
		],
		isClearable : true,
		span        : 6,
	},
];
export default airCustomControls;

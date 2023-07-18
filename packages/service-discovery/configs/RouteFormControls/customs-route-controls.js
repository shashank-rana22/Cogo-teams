const customsRouteControls = [
	{
		name        : 'location',
		type        : 'async-select',
		label       : 'Customs Location',
		placeholder : 'Port, or, Airport',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		params      : {
			page_limit      : 20,
			includes        : { default_params_required: true },
			filters         : { type: ['seaport'], status: 'active' },
			recommendations : true,
		},
		isClearable : true,
		rules       : { required: 'Location is required' },
	},
	{
		name        : 'type',
		type        : 'select',
		label       : 'Custom Type',
		placeholder : 'Import or Export',
		span        : 3,
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
		rules: { required: 'Type is required' },
	},
	{
		name        : 'service_type',
		type        : 'select',
		label       : 'Service Type',
		placeholder : 'Select',
		value       : 'fcl_customs',
		span        : 3,
		options     : [
			{
				label : 'FCL',
				value : 'fcl_customs',
			},
			{
				label : 'LCL',
				value : 'lcl_customs',
			},
			{
				label : 'AIR',
				value : 'air_customs',
			},
		],
		rules: { required: 'Service is required' },
	},
];

export default customsRouteControls;

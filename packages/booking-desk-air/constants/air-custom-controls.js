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
];
export default airCustomControls;

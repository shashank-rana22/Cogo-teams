const domesticAirFreightControls = [
	{
		name           : 'origin_airport_id',
		label          : 'Origin Airport',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'airport',
				],
			},
		},
		isClearable: true,
	},
	{
		name           : 'destination_airport_id',
		label          : 'Destination Airport',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'airport',
				],
			},
		},
		isClearable: true,
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
		isClearable: true,
	},
];
export default domesticAirFreightControls;

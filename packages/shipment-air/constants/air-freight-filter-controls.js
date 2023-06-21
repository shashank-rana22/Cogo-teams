const airFreightControls = [
	{
		label       : 'Pending Invoice?',
		name        : 'triggered_pending_invoices',
		type        : 'select',
		className   : 'primary md',
		placeholder : 'Is Invoice Pending?',
		options     : [{ value: 'true', label: 'Yes' }],
		span        : 6,
	},
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
		isClearable : true,
		className   : 'primary md',
		span        : 6,
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
		isClearable : true,
		className   : 'primary md',
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
export default airFreightControls;

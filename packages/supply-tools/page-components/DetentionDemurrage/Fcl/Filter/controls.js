const controls = [
	{
		name        : 'location_type',
		label       : 'Location type',
		type        : 'select',
		placeholder : 'Location Type',
		options     : [
			{
				label : 'Seaport',
				value : 'seaport',
			},
			{
				label : 'Country',
				value : 'country',
			},
			{
				label : 'Trade',
				value : 'trade',
			},
			{
				label : 'Continent',
				value : 'continent',
			},
		],
	},
	{
		label          : 'Location',
		name           : 'location_id',
		placeholder    : 'Search via name',
		type           : 'async_select',
		optionsListKey : 'locations', // check key
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		placeholder    : 'Search shipping line',
		type           : 'async_select',
		optionsListKey : 'shipping-lines', // check key
	},
	{
		name           : 'container_size',
		label          : 'Container Size',
		type           : 'select',
		placeholder    : 'Search container size',
		optionsListKey : 'container-sizes', // check key
	},
	{
		name           : 'container_type',
		label          : 'Container Type',
		type           : 'select',
		optionsListKey : 'container-types', // check key
		placeholder    : 'Search container type',
	},
	{
		name    : 'trade_type',
		type    : 'select',
		label   : 'Trade Type',
		options : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
		],
		placeholder: 'Trade Type',
	},
	{
		name        : 'free_days_type',
		label       : 'Free Days Type',
		type        : 'select',
		span        : 12,
		placeholder : 'Choose Free Days type',
		options     : [
			{
				label : 'Detention',
				value : 'detention',
			},
			{
				label : 'Demurrage',
				value : 'demurrage',
			},
		],
	},
];

export default controls;

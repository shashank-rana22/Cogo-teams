const getTncControls = () => [
	{
		name      : 'service',
		label     : 'Service Type',
		type      : 'select',
		className : 'primary lg',
		options   : [
			{ label: 'FCL', value: 'fcl_freight' },
			{ label: 'LCL', value: 'lcl_freight' },
			{ label: 'AIR', value: 'air_freight' },
			{ label: 'FTL', value: 'ftl_freight' },
			{ label: 'LTL', value: 'ltl_freight' },
			{ label: 'Trailer', value: 'trailer_freight' },
			{ label: 'Haulage', value: 'haulage_freight' },
			// { label: 'Rails Domestic', value: 'rail_domestic_freight' },
			{ label: 'FCL Customs', value: 'fcl_customs' },
			{ label: 'LCL Customs', value: 'lcl_customs' },
			{ label: 'Air Customs', value: 'air_customs' },
			{ label: 'FCL Locals', value: 'fcl_freight_local' },
			{ label: 'LCL Locals', value: 'lcl_freight_local' },
			{ label: 'Air Locals', value: 'air_freight_local' },
		],
		span  : 6,
		rules : { required: true },
	},
	{

		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async_select',
		className      : 'primary lg',
		asyncKey       : 'list_operators',
		placeholder    : 'Select Shipping Line',
		optionsListKey : 'shipping-lines',
		defaultOptions : true,
		cacheOptions   : false,
		span           : 6,
		isClearable    : true,
		params         : {
			page_limit : 10,
			sort_by    : 'short_name',
			sort_type  : 'asc',
			filters    : { operator_type: 'shipping_line', status: 'active' },

		},
	},
	{

		name           : 'airline_id',
		label          : 'Airline',
		type           : 'async_select',
		className      : 'primary lg',
		asyncKey       : 'list_operators',
		placeholder    : 'Select Airline',
		optionsListKey : 'air-lines',
		defaultOptions : true,
		span           : 6,
		isClearable    : true,
		cacheOptions   : false,
	},
	{
		name        : 'trade_type',
		label       : 'Trade Type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		className   : 'primary lg',
		options     : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
			{
				label : 'Domestic',
				value : 'domestic',
			},
			{
				label : 'Overseas',
				value : 'overseas',
			},
		],
		span        : 6,
		isClearable : true,
	},
	{

		name           : 'country_id',
		label          : 'Country',
		type           : 'async_select',
		placeholder    : 'Select Country Name',
		optionsListKey : 'locations',
		asyncKey       : 'list_locations',
		className      : 'primary lg',
		span           : 6,
		params         : { filters: { type: ['country'] } },
	},

	{
		name           : 'paying_party_country_ids',
		label          : 'Paying Party Country',
		type           : 'async_select',
		optionsListKey : 'locations',
		asyncKey       : 'list_locations',
		placeholder    : 'Select Country Name',
		params         : { filters: { type: ['country'] } },
		span           : 4,
		multiple       : true,
	},
];

export default getTncControls;

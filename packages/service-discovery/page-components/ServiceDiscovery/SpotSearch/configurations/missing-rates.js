const config = {
	heading     : 'Missing Rates',
	api         : 'list_fcl_freight_rate_requests',
	placement   : 'center',
	type        : 'missing_rates',
	apiPrefix   : 'list',
	apiSuffix   : 'rate_requests',
	extraParams : {
		customer_details_required : true,
		is_stats_required         : false,
		booking_details_required  : true,
	},
	fields: [
		{
			label : 'Serial Id',
			key   : 'serial_id',
			func  : 'renderSerialId',
			span  : 1,
		},
		{
			label  : 'Shipper',
			key    : 'spot_search.importer_exporter.business_name',
			topKey : {
				key: 'spot_search.importer_exporter.business_name',
			},
			lowerKey: {
				key         : 'performed_by.name',
				popoverKey  : 'performed_by',
				withPopover : true,
			},
			span : 1.5,
			func : 'renderFieldPair',
		},
		{
			label     : 'Port pair',
			key       : 'service_type',
			pair_type : 'service_type',
			func      : 'renderPortPair',
			span      : 1.5,
		},
		{
			label : 'Preferred Price',
			key   : 'preferred_freight_rate',
			func  : 'renderPrice',
			span  : 1,
		},
		{
			label        : 'Cargo Detail',
			key          : '',
			func         : 'renderContainerInfo',
			commodityKey : 'spot_search_cargo_details',
			span         : 2,
		},
		{
			label : 'Remarks',
			key   : 'remarks',
			func  : 'renderRemarks',
			span  : 1.5,
		},
		{
			label : 'Status',
			key   : 'status',
			func  : 'renderStatus',
			span  : 1.5,
		},
		{
			label : 'Created At',
			key   : 'created_at',
			func  : 'renderDate',
			span  : 1,
		},
		{
			label : 'Updated At',
			key   : 'updated_at',
			func  : 'renderDate',
			span  : 1,
		},
	],
	filterProps: {
		showDateWrapper : true,
		controls        : [
			{
				name        : 'trade_type',
				label       : 'Trade Type',
				type        : 'select',
				span        : 12,
				isClearable : true,
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
			},
			{
				name        : 'location_id',
				label       : 'Location',
				multiple    : false,
				type        : 'async-select',
				asyncKey    : 'list_locations',
				params      : { filters: { type: ['seaport', 'country', 'pincode'] } },
				placeholder : 'Select',
				isClearable : true,
			},
			{
				type        : 'async-select',
				asyncKey    : 'list_locations',
				params      : { filters: { type: ['seaport'] } },
				caret       : true,
				name        : 'port_id',
				label       : 'Port',
				span        : 12,
				isClearable : true,
				countryType : 'country',
			},
			{
				name           : 'airport_id',
				label          : 'Airport',
				type           : 'async-select',
				asyncKey       : 'list_locations',
				defaultOptions : true,
				isClearable    : true,
				params         : { filters: { type: ['airport'] } },
				caret          : true,
			},
			{
				label             : 'Origin Airport',
				name              : 'origin_airport_id',
				placeholder       : 'Search via name',
				includedInOptions : false,
				type              : 'async-select',
				isClearable       : true,
				asyncKey          : 'list_locations',
				grouped           : ['city', 'country'],
				params            : { filters: { type: ['airport', 'country', 'city'] } },
			},
			{
				label             : 'Destination Airport',
				name              : 'destination_airport_id',
				placeholder       : 'Search via name',
				includedInOptions : false,
				isClearable       : true,
				type              : 'async-select',
				asyncKey          : 'list_locations',
				grouped           : ['city', 'country'],
				params            : { filters: { type: ['airport', 'country', 'city'] } },
			},
			{
				type   : 'async-select',
				params : {
					filters: {
						type: ['seaport'],
					},
				},
				name              : 'origin_port_id',
				label             : 'Origin Port',
				span              : 12,
				isClearable       : true,
				includedInOptions : false,
				asyncKey          : 'list_locations',
				grouped           : ['city', 'country'],
				placeholder       : 'Search location...',
			},
			{
				type   : 'async-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name        : 'trade_id',
				label       : ' Trade',
				span        : 12,
				isClearable : true,
				asyncKey    : 'list_locations',
				placeholder : 'Search location...',
			},
			{
				type   : 'async-select',
				params : {
					filters: {
						type: ['seaport'],
					},
				},
				name              : 'destination_port_id',
				label             : 'Destination Port',
				includedInOptions : false,
				span              : 12,
				isClearable       : true,
				asyncKey          : 'list_locations',
				grouped           : ['city', 'country'],
				placeholder       : 'Search location...',
			},
			{
				type        : 'async-select',
				isClearable : true,
				params      : {
					filters: {
						type: ['seaport', 'country', 'pincode'],
					},
				},
				caret       : true,
				multiple    : false,
				name        : 'origin_location_id',
				label       : 'Origin Location',
				asyncKey    : 'list_locations',
				placeholder : 'Origin..',
				span        : 12,
			},
			{
				type        : 'async-select',
				isClearable : true,
				params      : {
					filters: {
						type: ['seaport', 'country', 'pincode'],
					},
				},
				name        : 'destination_location_id',
				label       : 'Destination Location',
				span        : 12,
				asyncKey    : 'list_locations',
				placeholder : 'Destination..',
			},
			{
				type   : 'async-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name        : 'origin_trade_id',
				label       : 'Origin Trade',
				span        : 12,
				isClearable : true,
				asyncKey    : 'list_locations',
				placeholder : 'Search location...',
			},
			{
				type   : 'async-select',
				params : {
					filters: {
						type: ['trade'],
					},
				},
				name        : 'destination_trade_id',
				label       : 'Destination Trade',
				span        : 12,
				isClearable : true,
				asyncKey    : 'list_locations',
				placeholder : 'Search location...',
			},
		],
	},
};

export default config;
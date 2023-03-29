export const possibleServices = [
	{
		service_type  : 'trailer_freight_service',
		display_label : 'Origin Trailer Transportation',
		trade_type    : 'export',
	},
	{
		service_type  : 'ftl_freight_service',
		display_label : 'Origin FTL Transportation',
		trade_type    : 'export',

	},
	{
		service_type  : 'fcl_cfs_service',
		display_label : 'Origin CFS',
		trade_type    : 'export',
	},
	{
		service_type  : 'haulage_freight_service',
		display_label : 'Origin Haulage',
		trade_type    : 'export',
	},
	{
		service_type  : 'fcl_customs_service',
		display_label : 'Origin Custom Clearance',
		trade_type    : 'export',
	},
	{
		mainServices: [
			{
				service_type  : 'fcl_freight_local_service',
				display_label : 'Origin FCL Locals',
				trade_type    : 'export',
			},
			{
				service_type  : 'fcl_freight_service',
				display_label : 'FCL Freight',
			},
			{
				service_type  : 'fcl_freight_local_service',
				display_label : 'Destination FCL Local',
				trade_type    : 'import',
			},
		],
	},
	{
		service_type  : 'fcl_customs_service',
		display_label : 'Destination Custom Clearance',
		trade_type    : 'import',
	},
	{
		service_type  : 'haulage_freight_service',
		display_label : 'Destination Haulage',
		trade_type    : 'import',
	},
	{
		service_type  : 'fcl_cfs_service',
		display_label : 'Destination CFS',
		trade_type    : 'import',
	},
	{
		service_type  : 'ftl_freight_service',
		display_label : 'Destination FTL Transportation',
		trade_type    : 'import',
	},
	{
		service_type  : 'trailer_freight_service',
		display_label : 'Destination Trailer Transportation',
		trade_type    : 'import',
	},
];

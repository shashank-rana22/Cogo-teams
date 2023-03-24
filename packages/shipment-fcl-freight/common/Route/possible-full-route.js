export const possibleServices = [
	{
		service_type : 'trailer_freight_service',
		display_name : 'Origin Trailer Transportation',
		trade_type   : 'export',
	},
	{
		service_type : 'ftl_freight_service',
		display_name : 'Origin FTL Transportation',
		trade_type   : 'export',

	},
	{
		service_types : 'fcl_cfs_service',
		display_name  : 'Origin CFS',
		trade_type    : 'export',
	},
	{
		service_type : 'haulage_freight_service',
		display_name : 'Origin Haulage',
		trade_type   : 'export',
	},
	{
		service_type : 'fcl_customs_service',
		display_name : 'Origin Custom Clearance',
		trade_type   : 'export',
	},
	{
		mainServices: [
			{
				service_types : 'fcl_freight_local_service',
				display_name  : 'Origin FCL Locals',
				trade_Type    : 'export',
			},
			{
				service_types : 'fcl_freight_service',
				display_name  : 'FCL Freight',
			},
			{
				service_types : 'fcl_freight_local_service',
				display_name  : 'Destination FCL Local',
				trade_Type    : 'import',
			},
		],
	},
	{
		service_type : 'fcl_customs_service',
		display_name : 'Destination Custom Clearance',
		trade_Type   : 'import',
	},
	{
		service_type : 'haulage_freight_service',
		display_name : 'Destination Haulage',
		trade_Type   : 'import',
	},
	{
		service_type : 'fcl_cfs_service',
		display_name : 'Destination CFS',
		trade_Type   : 'import',
	},
	{
		service_type : 'ftl_freight_service',
		display_name : 'Destination FTL Transportation',
		trade_Type   : 'import',
	},
	{
		service_type : 'trailer_freight_service',
		display_name : 'Destination Trailer Transportation',
		trade_Type   : 'import',
	},
];

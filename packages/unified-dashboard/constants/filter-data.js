const trade = [
	{
		name     : 'trade_type',
		type     : 'checkbox',
		span     : 4,
		multiple : true,
		rules    : {
			required: true,
		},
		options: [
			{
				label : 'Import',
				value : 'import',
				name  : 'trade_type',
			},
			{
				label : 'Export',
				value : 'export',
				name  : 'trade_type',
			},
			{
				label : 'Domestic',
				value : 'domestic',
				name  : 'trade_type',
			},
			{
				label : 'Local',
				value : 'local',
				name  : 'trade_type',
			},
		],
	},
];

const shipment = [
	{
		name     : 'shipment_type',
		type     : 'checkbox',
		span     : 4,
		multiple : true,
		rules    : {
			required: true,
		},
		options: [
			{
				label : 'FCL freight',
				value : 'fcl_freight',
				name  : 'shipment_type',
			},
			{
				label : 'LCL freight',
				value : 'lcl_freight',
				name  : 'shipment_type',
			},
			{
				label : 'AIR freight',
				value : 'air_freight',
				name  : 'shipment_type',
			},
			{
				label : 'LTL freight',
				value : 'ltl_freight',
				name  : 'shipment_type',
			},
			{

				label : 'FTL freight',
				value : 'ftl_freight',
				name  : 'shipment_type',
			},
			{
				label : 'Haulage freight',
				value : 'haulage_freight',
				name  : 'shipment_type',
			},
			{
				label : 'LCL customs',
				value : 'lcl_customs',
				name  : 'shipment_type',
			},
			{
				label : 'FCL customs',
				value : 'fcl_customs',
				name  : 'shipment_type',
			},
			{
				label : 'AIR customs',
				value : 'air_customs',
				name  : 'shipment_type',
			},
			{
				label : 'FCL freight local',
				value : 'fcl_freight_local',
				name  : 'shipment_type',
			},
			{
				label : 'LCL freight local',
				value : 'lcl_freight_local',
				name  : 'shipment_type',
			},
			{
				label : 'AIR freight local',
				value : 'air_freight_local',
				name  : 'shipment_type',
			},
		],
	},
];

export { trade, shipment };

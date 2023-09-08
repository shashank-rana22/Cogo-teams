const controls = {
	service: {
		name        : 'service_type',
		type        : 'select',
		placeholder : 'Select Service Type ',
		options     : [
			{
				id    : 1,
				label : 'FCL freight',
				value : 'fcl_freight_service',
			},
			{
				id    : 2,
				label : 'LCL freight',
				value : 'lcl_freight_service',
			},
			{
				id    : 3,
				label : 'AIR freight',
				value : 'air_freight_service',
			},
			{
				id    : 4,
				label : 'LTL freight',
				value : 'ltl_freight_service',
			},
			{
				id    : 5,
				label : 'FTL freight',
				value : 'ftl_freight_service',
			},
			{
				id    : 6,
				label : 'Haulage freight',
				value : 'haulage_freight_service',
			},
			{
				id    : 7,
				label : 'LCL customs',
				value : 'lcl_customs_service',
			},
			{
				id    : 8,
				label : 'FCL customs',
				value : 'fcl_customs_service',
			},
			{
				id    : 9,
				label : 'AIR customs',
				value : 'air_customs_service',
			},
			{
				id    : 9,
				label : 'FCL freight local',
				value : 'fcl_freight_local_service',
			},
			{
				id    : 9,
				label : 'LCL freight local',
				value : 'lcl_freight_local_service',
			},
			{
				id    : 9,
				label : 'AIR freight local',
				value : 'air_freight_local_service',
			},
		],
		rules: { required: 'Service Type is Required' },
	},
	trade: {
		name    : 'trade_type',
		type    : 'radio',
		options : [
			{ label: 'Import', value: 'import' },
			{ label: 'Export', value: 'export' },
		],
	},

	wallet: {
		name  : 'wallet_amount',
		type  : 'input',
		rules : { required: 'Wallet Amount is Required' },
	},

	currency: {
		name    : 'currency',
		type    : 'select',
		options : [
			{
				label : 'USD',
				value : 'USD',
			},
		],
		rules: { required: 'Currency  is Required' },
	},
};
export default controls;

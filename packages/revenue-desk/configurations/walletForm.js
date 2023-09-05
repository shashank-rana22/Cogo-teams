const controls = {
	service: {
		name        : 'service_type',
		type        : 'select',
		placeholder : 'Select Service Type ',
		options     : [
			{
				id    : 1,
				label : 'FCL freight',
				value : 'fcl_freight',
			},
			{
				id    : 2,
				label : 'LCL freight',
				value : 'lcl_freight',
			},
			{
				id    : 3,
				label : 'AIR freight',
				value : 'air_freight',
			},
			{
				id    : 4,
				label : 'LTL freight',
				value : 'ltl_freight',
			},
			{
				id    : 5,
				label : 'FTL freight',
				value : 'ftl_freight',
			},
			{
				id    : 6,
				label : 'Haulage freight',
				value : 'haulage_freight',
			},
			{
				id    : 7,
				label : 'LCL customs',
				value : 'lcl_customs',
			},
			{
				id    : 8,
				label : 'FCL customs',
				value : 'fcl_customs',
			},
			{
				id    : 9,
				label : 'AIR customs',
				value : 'air_customs',
			},
			{
				id    : 9,
				label : 'FCL freight local',
				value : 'fcl_freight_local',
			},
			{
				id    : 9,
				label : 'LCL freight local',
				value : 'lcl_freight_local',
			},
			{
				id    : 9,
				label : 'AIR freight local',
				value : 'air_freight_local',
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

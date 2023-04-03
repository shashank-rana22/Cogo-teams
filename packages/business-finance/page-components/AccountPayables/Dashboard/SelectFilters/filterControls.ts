export const filterControls = [
	{
		name           : 'currency',
		type           : 'select',
		placeholder    : 'Currency',
		size           : 'sm',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		options        : [
			{ value: 'INR', label: 'INR' },
			{ value: 'USD', label: 'USD' },
			{ value: 'SGD', label: 'SGD' },
			{ value: 'EUR', label: 'EUR' },
		],
	},
	{

		name : 'service',
		type : 'select',
		size : 'sm',

		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		placeholder    : 'Service',
		options        : [
			{ value: 'fcl_freight', label: 'FCL' },
			{ value: 'lcl_freight', label: 'LCL' },
			{ value: 'air_freight', label: 'AIR' },
			{ value: 'trailer_freight', label: 'Container Transportation' },
			{ value: 'ftl_freight', label: 'FTL' },
			{ value: 'ltl_freight', label: 'LTL' },
			{ value: 'haulage_freight', label: 'Rail Haulage' },
			{ value: 'fcl_customs', label: 'FCL Customs' },
			{ value: 'lcl_customs', label: 'LCL Customs' },
			{ value: 'air_customs', label: 'AIR Customs' },
			{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
		],

	},
];

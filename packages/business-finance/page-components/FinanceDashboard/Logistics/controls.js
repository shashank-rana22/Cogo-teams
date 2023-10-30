const controls = [
	{

		name           : 'serviceType',
		type           : 'multiSelect',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		placeholder    : ' Select Service',
		className      : 'primaryfilter primary md',
		options        : [
			{ value: 'FCL_FREIGHT', label: 'FCL' },
			{ value: 'LCL_FREIGHT', label: 'LCL' },
			{ value: 'AIR_FREIGHT', label: 'AIR' },
			{ value: 'TRAILER_FREIGHT', label: 'Container Transportation' },
			{ value: 'FTL_FREIGHT', label: 'FTL' },
			{ value: 'LTL_FREIGHT', label: 'LTL' },
			{ value: 'HAULAGE_FREIGHT', label: 'Rail Haulage' },
			{ value: 'FCL_CUSTOMS', label: 'FCL Customs' },
			{ value: 'LCL_CUSTOMS', label: 'LCL Customs' },
			{ value: 'AIR_CUSTOMS', label: 'AIR Customs' },
			{ value: 'FCL_FREIGHT_LOCAL', label: 'FCL Freight Local' },
		],
	},
	{
		name                  : 'date',
		placeholder           : 'Select Date',
		type                  : 'singleDateRange',
		span            				  : 6,
		isPreviousDaysAllowed : true,
		caret                 : true,
		isClearable           : true,
	},

];
export default controls;

export const treasuryControls = [
	{
		name                  : 'date',
		placeholder           : 'Select Date',
		type                  : 'singleDateRange',
		isPreviousDaysAllowed : true,
		caret                 : true,
		isClearable           : true,
		style                 : { width: '200px' },
	},
];

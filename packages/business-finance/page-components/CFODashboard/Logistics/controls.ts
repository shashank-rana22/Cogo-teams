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
		name           : 'days',
		type           : 'select',
		placeholder    : 'Days',
		isClearable    : true,
		span           : 1,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{ value: 'today', label: 'Today' },
			{ value: 'Last 3 Days', label: 'Last 3 Days' },
			{ value: 'Last 7 Days', label: 'Last 7 Days' },
			{ value: 'Last 14 Days', label: 'Last 14 Days' },
			{ value: 'Last Month', label: 'Last Month' },
			{ value: 'Last 3 Months', label: 'Last 3 Months' },
			{ value: 'Last 6 Months', label: 'Last 6 Months' },
		],
	},
];

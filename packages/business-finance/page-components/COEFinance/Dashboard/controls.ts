export const filterControls = [
	{
		name           : 'zone',
		type           : 'multiSelect',
		placeholder    : 'zone',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		options        : [
			{ value: 'NORTH', label: 'North' },
			{ value: 'SOUTH', label: 'South' },
			{ value: 'EAST', label: 'East' },
			{ value: 'WEST', label: 'West' },
		],
	},
	{

		name           : 'serviceType',
		type           : 'multiSelect',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		placeholder    : ' Select Service',
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
		name           : 'timePeriod',
		type           : 'select',
		placeholder    : 'Days',
		isClearable    : true,
		span           : 1,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{ label: 'Last 3 Days', value: 'three' },
			{ label: 'Last 7 Days', value: 'seven' },
			{ label: 'Last 15 Days', value: 'fifteen' },
			{ label: 'Last Month', value: 'thirty' },
			{ label: 'Last 3 Months', value: 'threeMonth' },
			{ label: 'Last 6 Months', value: 'sixMonth' },
		],
	},
	{
		name                  : 'dateRange',
		type                  : 'singleDateRange',
		placeholder           : 'Date Range',
		isPreviousDaysAllowed : true,
		span                  : 2,
	},

];
export const reportControls = [
	{

		name           : 'type',
		type           : 'select',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		placeholder    : 'Type',
		options        : [
			{ value: 'sales', label: 'Sales' },
			{ value: 'purchase', label: 'Purchase' },
			{ value: 'profitability', label: 'Profitability' },
			{ value: 'sales_report_gst', label: 'Sales Report - GST' },
			{ value: 'purchase_report_gst', label: 'Purchase Report - GST' },
		],

	},
	{
		name                  : 'date',
		type                  : 'singleDateRange',
		isPreviousDaysAllowed : true,
		placeholder           : 'Date',
		span                  : 2,
	},

];

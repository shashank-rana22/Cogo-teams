export const filterControls = [

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
			{ label: 'Last 10 Days', value: 'day' },
			{ label: 'Last 10 weeks', value: 'week' },
			{ label: 'Last 10 months', value: 'month' },
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

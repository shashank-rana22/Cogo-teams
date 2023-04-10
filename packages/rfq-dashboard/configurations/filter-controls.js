const controls = [
	{
		name        : 'search',
		type        : 'text',
		placeholder : 'Search RFQ ID / Customer Name',
	},
	{
		name : 'Profitability',
		type : 'rangeSlider',
	},
	{
		name     : 'organization_size',
		label    : 'Organization Size',
		type     : 'chips',
		multiple : true,
		options  : [
			{
				label : 'Long Tail',
				value : 'long_tail',
			},
			{
				label : 'Enterprise',
				value : 'enterprise',
			},
			{
				label : 'SME',
				value : 'sme',
			},
			{
				label : 'Unknown',
				value : 'unknown',
			},
		],
	},
	{
		name    : 'service_type',
		label   : 'Service Type',
		type    : 'chips',
		options : [
			{
				label : 'FCL',
				value : 'fcl_freight',
			},
			{
				label : 'LCL',
				value : 'lcl_freight',
			},
			{
				label : 'AIR',
				value : 'air_freight',
			},
		],
	},
	{
		name        : 'start_date',
		label       : 'Start Date',
		placeholder : 'select start date',
		type        : 'datePicker',
	},
	{
		name        : 'end_date',
		label       : 'End Date',
		type        : 'datePicker',
		placeholder : 'select end date',
		maxDate     : new Date(),

	}];

export default controls;

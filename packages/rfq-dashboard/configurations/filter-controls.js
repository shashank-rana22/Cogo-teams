const controls = [
	{
		name        : 'search',
		type        : 'text',
		placeholder : 'Search RFQ ID / Customer Name',
	},
	{
		name        : 'profitability',
		label       : 'Profitability (%)',
		type        : 'slider',
		min         : 0,
		max         : 100,
		step        : 1,
		sliderWidth : 300,
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
				label : 'ChannelPartner',
				value : 'channel_partner',
			},
			{
				label : 'Mid Size',
				value : 'mid_size',
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
		name                  : 'start_date',
		label                 : 'Start Date',
		type                  : 'datePicker',
		placeholder           : 'select start date',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
	},
	{
		name                  : 'end_date',
		label                 : 'End Date',
		type                  : 'datePicker',
		placeholder           : 'select end date',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),

	}];

export default controls;

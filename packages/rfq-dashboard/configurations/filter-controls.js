const controls = {
	search: {
		name        : 'search',
		type        : 'text',
		placeholder : 'Search RFQ ID / Customer Name',
	},
	organization_size: {
		name    : 'organization_size',
		type    : 'pills',
		options : [
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
	service_type: {
		name    : 'service_type',
		type    : 'select',
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
	start_date: {
		name : 'start_date',
		type : 'datePicker',
	},
	end_date: {
		name    : 'end_date',
		type    : 'datePicker',
		maxDate : new Date(),

	},
};

export default controls;

export const exceptionMasterFilters = [
	{
		name        : 'category',
		type        : 'select',
		placeholder : 'Category',
		isClearable : true,
		span        : 2,
		options     : [
			{
				label : 'SME',
				value : 'sme',
			},
			{
				label : 'ENTERPRISE',
				value : 'enterprise',
			},
			{
				label : 'LARGE',
				value : 'large',
			},
		],

	},
	{
		name        : 'creditDays',
		type        : 'select',
		span        : 1,
		placeholder : 'Credit Days',
		isClearable : true,
		options     : [
			{
				label : 'Upto 30 days',
				value : '30',
			},
			{
				label : '30 to 60 days',
				value : '60',
			},
			{
				label : '60 to 90 days',
				value : '90',
			},
		],
	},

];

export const exceptionCycleWiseFilters = [
	{
		name        : 'cycleStatus',
		type        : 'select',
		placeholder : 'Cycle Status',
		isClearable : true,
		span        : 2,
		options     : [
			{
				label : 'ACTIVE',
				value : 'ACTIVE',
			},
			{
				label : 'INACTIVE',
				value : 'INACTIVE',
			},
		],

	},

];

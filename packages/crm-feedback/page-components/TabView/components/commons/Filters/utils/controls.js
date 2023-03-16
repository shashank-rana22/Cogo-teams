export const controlsFeedbacks = (organizationOptions, kamOptions, kamManagerOptions) => [
	{
		name        : 'cogo_entity',
		placeholder : 'Cogo Entity',
		type        : 'select',
		isClearable : true,
		options     : [
			{
				label : 'India',
				value : 'india',
			},
			{
				label : 'Vietnam',
				value : 'vietnam',
			},
			{
				label : 'Singapore',
				value : 'singapore',
			},
		],
		params: { filters: { status: 'active' } },
	},
	{
		...organizationOptions,
		name        : 'organization',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamManagerOptions,
		name        : 'kam_manager',
		placeholder : 'KAM Manager',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamOptions,
		name        : 'kam',
		placeholder : 'KAM',
		type        : 'select',
		isClearable : true,
	},
];

export const controlsRequests = (organizationOptions) => [
	{
		name        : 'cogo_entity',
		placeholder : 'Cogo Entity',
		type        : 'select',
		isClearable : true,
		options     : [
			{
				label : 'India',
				value : 'india',
			},
			{
				label : 'Vietnam',
				value : 'vietnam',
			},
			{
				label : 'Singapore',
				value : 'singapore',
			},
		],
		params: { filters: { status: 'active' } },
	},
	{
		...organizationOptions,
		name        : 'organization',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

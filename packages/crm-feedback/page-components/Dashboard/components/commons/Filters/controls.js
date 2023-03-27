export const controlsFeedbacks = (organizationOptions, kamOptions, kamManagerOptions) => [
	{
		name        : 'agent_partner_id',
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
		name        : 'organization_id',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamManagerOptions,
		name        : 'manager_id',
		placeholder : 'KAM Manager',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamOptions,
		name        : 'performed_by_id',
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
		name        : 'organization_id',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

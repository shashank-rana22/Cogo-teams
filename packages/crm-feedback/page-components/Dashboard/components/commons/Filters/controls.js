export const controlsFeedbacks = (cogoEntityOptions, organizationOptions, kamOptions, kamManagerOptions) => [
	{
		...cogoEntityOptions,
		name        : 'agent_partner_id',
		placeholder : 'Cogo Entity',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
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

export const controlsRequests = (cogoEntityOptions, organizationOptions) => [
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

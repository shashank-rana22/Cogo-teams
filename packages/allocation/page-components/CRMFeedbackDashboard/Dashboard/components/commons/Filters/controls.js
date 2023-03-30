export const controlsFeedbacks = (
	cogoEntityOptions,
	organizationOptions,
	leadOrganizationOptions,
	kamOptions,
	kamManagerOptions,
) => [
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
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : 'Lead Organization',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamManagerOptions,
		name        : 'manager_id',
		placeholder : 'KAM Manager',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamOptions,
		name        : 'performed_by_id',
		placeholder : 'KAM',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

export const controlsRequests = (organizationOptions, leadOrganizationOptions) => [
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : 'Organization',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : 'Lead Organization',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

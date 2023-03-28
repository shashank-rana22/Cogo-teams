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
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : 'Lead Organization',
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

export const controlsRequests = (organizationOptions, leadOrganizationOptions) => [
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : 'Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : 'Lead Organization',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

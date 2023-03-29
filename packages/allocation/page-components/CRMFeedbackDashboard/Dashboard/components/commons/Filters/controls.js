export const controlsFeedbacks = (
	organizationOptions,
	leadOrganizationOptions,
	kamOptions,
	kamManagerOptions,
) => [
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

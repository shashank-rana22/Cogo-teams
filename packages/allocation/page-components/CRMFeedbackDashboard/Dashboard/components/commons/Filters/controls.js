export const controlsFeedbacks = (
	cogoEntityOptions,
	organizationOptions,
	leadOrganizationOptions,
	kamOptions,
	kamManagerOptions,
	t = () => {},
) => [
	{
		...cogoEntityOptions,
		name        : 'agent_partner_id',
		placeholder : t('allocation:agent_partner_id_placeholder'),
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : t('allocation:organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : t('allocation:lead_organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamManagerOptions,
		name        : 'manager_id',
		placeholder : t('allocation:manager_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamOptions,
		name        : 'performed_by_id',
		placeholder : t('allocation:performed_by_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

export const controlsRequests = (organizationOptions, leadOrganizationOptions, t = () => {}) => [
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : t('allocation:organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : t('allocation:lead_organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];

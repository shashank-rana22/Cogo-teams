const controls = [
	{
		label       : 'Company Name',
		name        : 'company_name',
		type        : 'async_select',
		asyncKey    : 'organizations',
		initialCall : true,
		placeholder : 'Select Company',
		valueKey    : 'id',
		span        : 12,
		labelKey    : 'business_name',
		size        : 'sm',
	},
	{
		label       : 'Agent Name',
		name        : 'agent_name',
		type        : 'async_select',
		asyncKey    : 'partner_users_ids',
		initialCall : true,
		placeholder : 'Select Agent',
		valueKey    : 'id',
		span        : 12,
		labelKey    : 'name',
		size        : 'sm',
	},
	{
		label       : 'Type',
		name        : 'account_type',
		type        : 'select',
		placeholder : 'Select',
		options     : [
			{
				label : 'Importer Exporter',
				value : 'importer_exporter',
			},
			{
				label : 'Channel Partner',
				value : 'channel_partner',
			},
			{
				label : 'Service Provider',
				value : 'service_provider',
			},
		],
		span : 12,
		size : 'sm',
	},
];

export default controls;

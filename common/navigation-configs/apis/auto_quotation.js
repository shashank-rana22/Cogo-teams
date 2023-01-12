const auto_quotation = [
	{
		api          : 'list_organization_trade_requirements_rates',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_rate_sheet',
		access_type  : 'private',
		service_name : 'rate_sheet',
	},
	{
		api          : 'update_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_trade_requirement_csv',
		access_type  : 'private',
		scope        : 'partner',
		service_name : 'organization',
	},
	{
		api          : 'get_trade_requirements_email_frequency',
		access_type  : 'private',
		scope        : 'partner',
		service_name : 'organization',
	},
	{
		api          : 'create_trade_requirements_email_frequency',
		access_type  : 'private',
		scope        : 'partner',
		service_name : 'organization',
	},
	{
		api          : 'list_communication_stats',
		access_type  : 'private',
		scope        : 'partner',
		service_name : 'communication',
	},
];

export default auto_quotation;

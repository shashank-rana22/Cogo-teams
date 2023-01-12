const credit_request = [
	{
		api          : 'list_credit_allocations',
		access_type  : 'private',
		service_name : 'credit',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_credit_requests',
		access_type  : 'private',
		service_name : 'credit',
	},
	{
		api          : 'list_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_business',
		access_type  : 'private',
		service_name : 'business',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
];

export default credit_request;

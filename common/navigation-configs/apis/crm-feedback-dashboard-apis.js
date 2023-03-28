const crm_feedback_dashboard = [
	{
		api          : 'get_allocation_feedbacks',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'get_allocation_feedback_requests',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_lead_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_allocation_feedback_stats',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'get_allocation_feedback_request_stats',
		access_type  : 'private',
		service_name : 'allocation',
	},
];

export default crm_feedback_dashboard;

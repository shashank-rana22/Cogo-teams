const ihls = {
	lead_enrichment_dashboard: [
		{
			api          : 'get_allocation_objectives',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'list_enrichment_sources',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'list_locations',
			access_type  : 'public',
			service_name : 'location',
		},
		{
			api          : 'get_allocation_objective_details',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'list_leads',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'lead_stats',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'get_objective_list',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'list_enrichment_requests',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'create_enrichment_request',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'update_enrichment_request',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'create_enrichment_user_metadata',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'list_enrichment_users',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'lead_data_url',
			access_type  : 'public',
			service_name : 'athena',
		},
		{
			api          : 'org_enrichment_history',
			access_type  : 'public',
			service_name : 'athena',
		},
	],
};

export default ihls;

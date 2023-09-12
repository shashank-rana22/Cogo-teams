const ihls = {
	lead_enrichment_dashboard: [
		{
			api          : 'get_allocation_objectives',
			access_type  : 'private',
			service_name : 'allocation',
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
	],
};

export default ihls;

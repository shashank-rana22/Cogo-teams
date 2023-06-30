const apis = {
	saas_tools_standard_milestones: [

		{
			api          : 'list_standard_event_mapping',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_standard_event',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_standard_event',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],
	saas_live_vessel_tracking: [
		{
			api         : 'get_ais_vessel_tracking_data',
			access_type : 'private',
			module      : 'live-vessel-tracking',
			feature     : 'live-vessel-tracking',
		},
	],
};
export default apis;

const schedules_apis = {
	ocean_port_coverage: [
		{
			api          : 'list_sailing_schedule_port_pairs',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
	],
	vessel_schedules: [
		{
			api          : 'list_vessel_schedules',
			access_type  : 'private',
			service_name : 'location',
		},
	],
	service_lanes: [
		{
			api          : 'list_service_lanes',
			access_type  : 'private',
			service_name : 'location',
		},
	],
	sailing_schedule: [
		{
			api          : 'list_sailing_schedule_subscriptions',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
	],
};
export default schedules_apis;

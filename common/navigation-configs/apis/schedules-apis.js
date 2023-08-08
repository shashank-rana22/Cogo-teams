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
		{
			api          : 'create_vessel_schedule',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'update_vessel_schedule',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_vessels',
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
		{
			api          : 'create_service_lane',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'update_service_lane',
			access_type  : 'private',
			service_name : 'location',
		},
	],
	sailing_schedule: [
		{
			api          : 'list_sailing_schedules',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'create_sailing_schedule',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'get_sea_route',
			access_type  : 'private',
			service_name : 'location',
		},
	],
};
export default schedules_apis;

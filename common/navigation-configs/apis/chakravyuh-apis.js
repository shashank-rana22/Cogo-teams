const chakravyuh = {
	pricing_trends: [
		{
			api          : 'list_fcl_freight_rate_estimations',
			access_type  : 'private',
			feature      : 'pricing_trends',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_estimation_trends',
			access_type  : 'private',
			feature      : 'pricing_trends',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_periodic_fcl_freight_rate_estimation_trends',
			access_type  : 'private',
			feature      : 'pricing_trends',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_deviations',
			access_type  : 'private',
			feature      : 'feedbacks',
			service_name : 'fcl_freight_rate',
		},
	],
	pricing_accuracy_dashboard: [
		{
			api          : 'get_simplified_geometry',
			service_name : 'location',
			feature      : 'pricing_accuracy_dashboard',
			access_type  : 'private',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'location',
		},
		{
			api          : 'list_nearest_available_location',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'location',
		},
		{
			api          : 'get_fcl_freight_rate_charts',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_fcl_freight_rate_distribution',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_fcl_freight_map_view_statistics',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_fcl_freight_rate_lifecycle',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_statistics',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_request_statistics',
			access_type  : 'private',
			feature      : 'pricing_accuracy_dashboard',
			service_name : 'fcl_freight_rate',
		},
	],
};

export default chakravyuh;

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
			api          : 'get_simplified_country_geometry',
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
	],
};

export default chakravyuh;

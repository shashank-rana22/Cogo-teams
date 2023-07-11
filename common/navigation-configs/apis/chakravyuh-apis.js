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

	],
};

export default chakravyuh;

const tools = {
	ocean_schedules: [
		{
			api          : 'list_sailing_schedule_subscriptions',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'get_sailing_schedule_subscription',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'create_sailing_schedule_subscription',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
	],
	freight_rate_trend: [
		{
			api          : 'get_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_subscriptions',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_rates',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_rate',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_store_quota',
			access_type  : 'private',
			service_name : 'store',
		},
	],
	container_tracking: [
		{
			api          : 'get_container_subscription',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'list_container_subscriptions',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'unsubscribe_container_update_subscription',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'get_container_update_subscription',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'create_container_subscription_share',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'subscribe_container_update_subscription',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'create_container_subscription',
			access_type  : 'private',
			service_name : 'container',
		},
		{
			api          : 'list_store_quota',
			access_type  : 'private',
			service_name : 'store',
		},
	],
};
export default tools;

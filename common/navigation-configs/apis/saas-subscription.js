const apis = {
	saas_subscription_customer: [
		{
			api          : 'get_saas_subscription_user_stats',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_subscription_customers',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'get_saas_subscription_profile',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_quota',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_plan_pricings',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_subscription',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'cancel_saas_subscription',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
	],
	saas_subscription_plan: [],
};

export default apis;

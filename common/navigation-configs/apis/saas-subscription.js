const apis = {
	saas_subscription_customer: [
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
		{
			api          : 'list_organizations',
			service_name : 'organization',
			access_type  : 'private',
		},
		{
			api          : 'create_saas_subscription',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_products',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'create_saas_custom_subscription',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_subscription_order',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_plans',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_subscription_validity',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'saas_get_usage_history',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_checkouts',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
	],
	saas_subscription_plan: [
		{
			api          : 'list_saas_plans',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'get_saas_plan_details',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_plan_pricing',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'list_saas_products',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_product_plan_mapping',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_plan_details',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_plan',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'update_saas_plan_discount_config',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
		{
			api          : 'create_saas_plan_discount_config',
			service_name : 'saas_subscriptions_v2',
			access_type  : 'private',
		},
	],
};

export default apis;

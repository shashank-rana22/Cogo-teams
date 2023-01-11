const product_pricing = [
	{
		api          : 'get_store_services',
		access_type  : 'private',
		service_name : 'store',
	},
	{
		api          : 'create_store_order',
		access_type  : 'private',
		service_name : 'store',
	},
	{
		api          : 'verify_payment',
		access_type  : 'private',
		service_name : 'payment',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_payment_order_link',
		access_type  : 'private',
		service_name : 'payment',
	},
	{
		api          : 'list_dashboard_fcl_freight_rates',
		access_type  : 'private',
		service_name : 'fcl_freight_rate',
	},
];

export default product_pricing;

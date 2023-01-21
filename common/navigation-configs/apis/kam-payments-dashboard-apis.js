const apis = [
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_sales_utrs',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_cogo_entities',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'create_shipment_sales_utr',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_organization_outstanding',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_outstanding_stats_by_kam_id',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_outstanding_wrapper',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'list_customer_outstanding_stats_by_kam_id',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'list_invoice_wrapper',
		access_type  : 'private',
		service_name : 'sage',
	},
];

export default apis;

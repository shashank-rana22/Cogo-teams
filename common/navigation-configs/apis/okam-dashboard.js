const okam_dashboard = [
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'onboard_organization_user',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_checkout',
		access_type  : 'private',
		service_name : 'checkout',
	},
	{
		api          : 'get_shipments_stats',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_invoice_combinations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_invoice_stats',
		access_type  : 'private',
		service_name : 'shipment',
	},
];

export default okam_dashboard;

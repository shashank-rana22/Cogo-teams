const invoice_approval = [
	{
		api          : 'list_shipment_purchase_invoices',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_purchase_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_auth_roles',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'get_auth_possible_permissions',
		access_type  : 'private',
		service_name : 'auth',
	},
];

export default invoice_approval;

const apis = [

	{
		api          : 'list_shipments',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_bl_details',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_sage_ar_outstandings',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'organization',
	},
	{
		api          : 'list_sage_proforma_invoices',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'bookings',
	},
	{
		api          : 'get_cost_sheet_quotations',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_trade_documents',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'trade',
	},
	{
		api          : 'get_proforma_invoice',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'get_shipment_invoice_preference',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'organization',
	},
	{
		api          : 'update_sage_proforma_invoice',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'send_proforma_to_customer',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'update_order',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'partner',
	},
	{
		api          : 'update_shipment_invoice_combination',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'get_sales_invoice_shipment_list',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api         : 'create_chat_message',
		access_type : 'private',
	},
	{
		api         : 'list_chat_channels',
		access_type : 'private',
	},
	{
		api         : 'delete_chat_message',
		access_type : 'private',
	},
	{
		api         : 'update_chat_message',
		access_type : 'private',
	},
	{
		api         : 'get_chat_channel',
		access_type : 'private',
	},
	{
		api         : 'create_chat_channel',
		access_type : 'private',
	},
	{
		api         : 'update_chat_channel_seen',
		access_type : 'private',

	},
	{
		api          : 'list_shipment_bl_details',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_trade_party_detail',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_do_details',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_invoice_wrapper',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'get_organization_outstanding',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api          : 'get_trade_party_outstanding',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'sage',
	},
	{
		api         : 'get_purchase_bills_list',
		access_type : 'private',
		feature     : 'coe_finance',
	},
	{
		api         : 'get_overall_stats',
		access_type : 'private',
		feature     : 'coe_finance',
	},
	{
		api         : 'get_invoice_trade_party_stats',
		access_type : 'private',
		feature     : 'coe_finance',
	},
	{
		api          : 'list_shipment_do_details',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_ltl_credit_control',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_surface_credit_control_shipments',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_surface_credit_control_grouped_shipments',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'bulk_update_surface_shipments',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'send_surface_credit_control_email',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_document',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_documents',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',
	},
	{
		api          : 'get_rail_shipment_cost_sheet',
		access_type  : 'private',
		feature      : 'bl_do',
		service_name : 'shipment',

	},
	{
		api          : 'raise_query',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_container_subscription',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_air_subscription',
		access_type  : 'private',
		service_name : 'air_tracking',
	},
	{
		api          : 'get_container_sea_route',
		access_type  : 'public',
		service_name : 'saas_traceability',
	},
	{
		api          : 'list_authority_desk_bl_shipments',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'bl_do',
	},
	{
		api          : 'list_authority_desk_do_shipments',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'bl_do',
	},
	{
		api          : 'get_servics',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'bl_do',
	},
	{
		api          : 'create_document',
		access_type  : 'private',
		service_name : 'bookings',
	},
];

export default apis;

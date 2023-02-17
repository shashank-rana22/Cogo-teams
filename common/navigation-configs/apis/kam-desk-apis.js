const apis = [
	{
		api          : 'list_kam_desk_shipments',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_invoice_preference',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_timeline',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_additional_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_trade_document',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_shipment_trade_documents',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_trade_document',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_sage_invoices_v2',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'generate_freight_certificate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_sell_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_cost_sheet_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_services_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'reallocate_shipment_service_provider',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'reallocate_shipment_dependent_service_provider',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_cogo_entities',
		access_type  : 'private',
		service_name : 'partner',
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
		api          : 'list_shipment_credit_notes',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_credit_note',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_credit_note',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_credit_note',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_currency',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_status',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_revoked_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'bulk_update_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_shipment_fault_alarm_description',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_additional_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_currency_conversions',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_documents',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_documents',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_pending_task',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'get_sales_invoice_shipment_list',
		access_type : 'private',
	},
	{
		api          : 'list_kam_desk_surface_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
];

export default apis;

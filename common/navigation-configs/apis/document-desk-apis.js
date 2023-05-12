const apis = [
	{
		api          : 'list_document_desk_shipments',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_lastmile_desk_shipments',
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
		api          : 'update_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		service_name : 'bookings',
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
		api          : 'create_chat_message',
		access_type  : 'private',
		service_name : 'chat',
	},
	{
		api          : 'list_chat_channels',
		access_type  : 'private',
		service_name : 'chat',
	},
	{
		api         : 'delete_chat_message',
		access_type : 'private',
	},
	{
		api          : 'update_chat_message',
		access_type  : 'private',
		service_name : 'chat',
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
		api          : 'update_chat_channel_seen',
		access_type  : 'private',
		service_name : 'chat',

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
		api          : 'list_shipment_documents',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_container_details',
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
		api          : 'list_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'get_purchase_bills_exchange_rate_deviation_by_id',
		access_type : 'private',
	},
	{
		api         : 'post_purchase_bills',
		access_type : 'private',
	},
	{
		api         : 'put_purchase_bills',
		access_type : 'private',
	},
	{
		api         : 'get_purchase_bills_tagging_map',
		access_type : 'private',
	},
	{
		api          : 'update_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_cogo_entities',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_all_exchange_rates',
		access_type  : 'private',
		service_name : 'exchange_rate',
	},
	{
		api          : 'list_organization_trade_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'search_products_v2',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_shipment_exchange_rate_deviation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_fault_alarm',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_fault_alarm',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_buy_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_additional_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_trade_requirement_draft',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_pocs',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'submit_organization_kyc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_organizations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_user_invitation',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_trade_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_trade_party',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_trade_party_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_document',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_audits',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_operating_instruction',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_operating_instruction',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_checkout_applicable_promocodes',
		access_type  : 'private',
		service_name : 'checkout',
	},
	{
		api          : 'update_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_operating_procedures',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_rate_charge_codes',
		access_type  : 'private',
		service_name : 'rate_sheet',
	},
];
export default apis;

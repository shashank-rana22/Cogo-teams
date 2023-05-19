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
		api          : 'update_shipment_pending_task',
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
	{
		api          : 'update_shipment_currency_conversion',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'add_shipment_invoice_combination_remarks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_organization_trade_requirement_draft',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_audits',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_sage_invoices_v2',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api         : 'get_sales_invoice_list',
		access_type : 'private',
	},
	{
		api          : 'list_organization_users',
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
		api          : 'generate_freight_certificate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_fcl_freight_rate_audits',
		access_type  : 'private',
		service_name : 'fcl_freight_rate',
	},
	{
		api          : 'list_air_freight_rate_audits',
		access_type  : 'private',
		service_name : 'air_freight_rate',
	},
	{
		api          : 'list_lcl_freight_rate_audits',
		access_type  : 'private',
		service_name : 'lcl_freight_rate',
	},
	{
		api         : 'get_purchase_bills_list',
		access_type : 'private',
	},
	{
		api          : 'get_sales_invoice_shipment_list',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_organizations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_additional_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_shipment_export_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_payment_mode',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_trade_contact',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_international_air_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_cogo_entities',
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
		service_name : 'organization',
	},
	{
		api          : 'create_shipment_container_exception',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_task_config',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_operating_procedures',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_flash_booking_rates',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_elligible_booking_document',
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
		api          : 'update_shipment_operating_instruction',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_trade_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_trade_party_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_shipment_booking_confirmation_preference',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_buy_quotations',
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
		api          : 'create_shipment_trade_partner',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_trade_partners',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_spot_search',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_all_exchange_rates',
		access_type  : 'private',
		service_name : 'exchange_rate',
	},
	{
		api          : 'send_invoice_email',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_service_providers',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_sage_ar_outstandings',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_ftl_freight_rate_cards',
		access_type  : 'private',
		service_name : 'ftl_freight_rate',
	},
	{
		api          : 'get_haulage_freight_rate_cards',
		access_type  : 'private',
		service_name : 'haulage_freight_rate',
	},
	{
		api          : 'verify_invoice_approval_otp',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_invoice_approval_otp',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_domestic_air_shipment_weightment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_domestic_air_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_auto_lr_generation_data',
		access_type  : 'public',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_operating_instruction',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_rate_charge_codes',
		access_type  : 'private',
		service_name : 'rate_sheet',
	},
	{
		api          : 'generate_do_noc_certificate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'generate_do_certificate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_nomination_notification',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_nomination_revert_email_notification',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_organization_document',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_shipment_contract_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_trade_documents',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'create_awb_inventory',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_ltl_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_awb_inventories',
		access_type  : 'private',
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
		api          : 'create_shipment_operating_instruction',
		access_type  : 'private',
		service_name : 'shipment',
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
		api          : 'list_shipment_cancellation_reasons',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_pending_task_authorization',
		access_type  : 'private',
		service_name : 'shipment',
	},

];

export default apis;

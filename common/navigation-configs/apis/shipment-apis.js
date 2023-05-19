const apis = [
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
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_audits',
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
		api          : 'list_shipment_notes',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_spot_negotiations',
		access_type  : 'private',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'list_spot_negotiation_rates',
		access_type  : 'private',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'list_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_sage_proforma_invoices',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'list_sage_invoices_v1',
		access_type  : 'private',
		service_name : 'sage',
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
		api          : 'list_shipment_contacts',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_truck_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'submit_organization_kyc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_shipment_invoice_preference',
		access_type  : 'private',
		service_name : 'shipment',
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
		api          : 'get_shipment_messages',
		access_type  : 'private',
		service_name : 'shipment',
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
		api          : 'get_sage_shipment_purchase_quotations',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_credit_note',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_credit_notes',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_shipment_timeline',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_document_types',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_invoice_preference',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_sailing_schedules',
		access_type  : 'private',
		service_name : 'sailing_schedule',
	},
	{
		api          : 'get_fcl_freight_rate',
		access_type  : 'private',
		service_name : 'fcl_freight_rate',
	},
	{
		api          : 'get_air_freight_rate',
		access_type  : 'private',
		service_name : 'air_freight_rate',
	},
	{
		api          : 'list_shipment_organizations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_haulage_freight_rate',
		access_type  : 'private',
		service_name : 'haulage_freight_rate',
	},
	{
		api          : 'get_spot_negotiation_rate_by_shipment_id',
		access_type  : 'private',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'create_shipment_note',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_additional_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_message',
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
		api          : 'create_shipment_purchase_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_shipment_contact',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_export_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_third_party_booking',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_pending_task',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_purchase_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_air_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_payment_mode',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_sell_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_sage_proforma_invoice',
		access_type  : 'private',
		service_name : 'sage',
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
		api          : 'update_sage_invoice',
		access_type  : 'private',
		service_name : 'sage',
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
		api          : 'update_shipment_truck_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'allocate_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_invoice_combination',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_trade_contacts',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_lcl_pudo_locations',
		access_type  : 'private',
		service_name : 'lcl_freight_rate',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_shipment_alert_stats',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_sage_invoice',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'create_trade_contact',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'get_shipment_purchase_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_cost_sheet_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'search_products_v2',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'list_sage_orders',
		access_type  : 'private',
		service_name : 'sage',
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
		api          : 'get_shipment_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_services_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_services_rate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_pending_task',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'complete_shipment_transition_state_task',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_international_air_shipment_booking_parameter',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'allocate_shipment_dependent_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_order',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'get_proforma_invoice',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'list_shipment_purchase_invoices',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_currency_conversion',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_currency_conversions',
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
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_subsidiary_service_rate',
		access_type  : 'private',
		service_name : 'subsidiary_service_rate',
	},
	{
		api          : 'list_subsidiary_service_rates',
		access_type  : 'private',
		service_name : 'subsidiary_service_rate',
	},
	{
		api          : 'send_purchase_invoice_for_approval',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_sage_shipment_purchase_quotations',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'update_purchase_order',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'send_proforma_to_customer',
		access_type  : 'private',
		service_name : 'sage',
	},
	{
		api          : 'create_shipment_container_exception',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_contact',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_billing_addresses',
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
		api          : 'create_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_subsidiary_service_rate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_subsidiary_service_rates',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_purchase_invoice_for_approval',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_sage_shipment_purchase_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_purchase_order',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_proforma_to_customer',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_container_exception',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_contact',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_task_configs',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_task_config',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_collection_party',
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
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_billing_addresses',
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
		api          : 'create_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_subsidiary_service_rate',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_subsidiary_service_rates',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_purchase_invoice_for_approval',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_sage_shipment_purchase_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_purchase_order',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_proforma_to_customer',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_container_exception',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_contact',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_task_configs',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_task_config',
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
		api          : 'update_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_exchange_rate_deviation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_data_for_invoice',
		access_type  : 'private',
		service_name : 'sage',
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
		api          : 'list_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'confirm_bookings',
	},
	{
		api          : 'update_shipment_booking_confirmation_preference',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'confirm_bookings',
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
		api          : 'get_shipment_fault_alarm_description',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'list_fcl_freight_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_ftl_freight_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_ltl_freight_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_fcl_customs_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_air_customs_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_haulage_freight_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_fcl_cfs_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api         : 'list_lcl_customs_rates',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api          : 'get_contract_previous_service_providers',
		access_type  : 'private',
		service_name : 'unified_dashboard',
		feature      : 'revenue_desk',
	},
	{
		api          : 'update_shipment_flash_booking_rate',
		access_type  : 'private',
		feature      : 'revenue_desk',
		service_name : 'shipment',
	},
	{
		api         : 'get_shipment_quotation',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api          : 'create_shipment_booking_confirmation_preference',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_flash_booking_rate',
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
		api          : 'get_all_exchange_rates',
		access_type  : 'private',
		service_name : 'exchange_rate',
	},
	{
		api          : 'get_collection_party_variance',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'get_shipment_tracker',
		access_type : 'private',
	},
	{
		api          : 'list_saas_container_subscriptions',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_container_subscription',
		access_type  : 'private',
		service_name : 'saas_traceability',
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
		api          : 'add_shipment_invoice_combination_remarks',
		access_type  : 'private',
		service_name : 'shipment',
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
		api          : 'get_airline_from_airway_bill',
		access_type  : 'private',
		service_name : 'operator',
	},
	{
		api          : 'get_airwaybill_prefix_from_airline',
		access_type  : 'private',
		service_name : 'operator',
	},
	{
		api          : 'get_shipment_manifest',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_ftl_freight_rate_cards',
		access_type  : 'private',
		service_name : 'ftl_freight_rate',
	},
	{
		api          : 'generate_master_airway_bill',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_dashboard_stats',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_user_rm_mappings',
		access_type  : 'private',
		service_name : 'partner',
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
		api          : 'list_shipment_bulk_operations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_bulk_operation',
		access_type  : 'private',
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
		api          : 'list_cost_booking_desk_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'get_subsidiary_service_rate_cards',
		access_type : 'private',
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
		api          : 'list_shipment_air_freight_rates',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_awb_inventories',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_air_freight_e_booking',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_kam_desk_shipments',
		access_type  : 'private',
		service_name : 'bookings',
	},
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
		api          : 'raise_query',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_air_subscription',
		access_type  : 'private',
		service_name : 'air_tracking',
	},
	{
		api          : 'bulk_update_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_container_sea_route',
		access_type  : 'public',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_rail_shipment_container_detail',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_rail_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_services',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_buyers',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_documents',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_additional_services',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_bill_of_ladings',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_process',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_tasks',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_timeline',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_shipment_transaction_insights',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_air_movement_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_cogoscore_tax_numbers',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_stakeholders',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_business',
		access_type  : 'private',
		service_name : 'business',
	},
	{
		api          : 'create_upsell',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_possible_documents',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'update_shipment_rail_domestic_freight_invoice_type',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_cancellation_reasons',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_liners_invoice_email',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_checkout_applicable_promocodes',
		access_type  : 'private',
		service_name : 'checkout',
	},
	{
		api          : 'bulk_create_shipment_ftl_freight_additional_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_ftl_freight_additional_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_saas_surface_shipment_detail',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_ftl_tracking_consent',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'get_saas_ftl_tracking_detail',
		access_type  : 'private',
		service_name : 'saas_traceability',
	},
	{
		api          : 'send_whatsapp_booking_note_delayed',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_whatsapp_counter_price',
		access_type  : 'private',
		service_name : 'communication',
		feature      : 'revenue_desk',
	},
	{
		api          : 'update_revenue_desk_shipment_sell_quotations',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'revenue_desk',
	},
	{
		api          : 'send_booking_preference_email',
		access_type  : 'private',
		service_name : 'communication',
		feature      : 'revenue_desk',
	},
	{
		api          : 'list_organization_assets',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_authority_desk_bl_documents',
		access_type  : 'private',
		service_name : 'bookings',
		feature      : 'bl_do',
	},
	{
		api          : 'list_organization_branches',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_asset',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_asset',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'generate_bluetide_hbl',
		access_type  : 'private',
		service_name : 'shipment',

	},
	{
		api          : 'get_pending_task_authorization',
		access_type  : 'private',
		service_name : 'shipment',
	},
];

export default apis;

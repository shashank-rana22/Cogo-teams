const apis = [
	{
		api          : 'list_contracts',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_trade_requirements_draft',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_search',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_search',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_rfq_contract',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contracted_organizations',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_organization_contract_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_fcl_freight_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ftl_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_lcl_freight_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_draft',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_rfqs',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'rfq',
	},
	{
		api          : 'get_rfq',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'rfq',
	},
	{
		api          : 'list_checkouts',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'get_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_margin',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_customize_quotation',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'list_trade_contacts',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'trade',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'book_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_margin',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'send_checkout_quotation_emails',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_customize_quotation',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'get_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'checkout',
	},
	{
		api          : 'get_sailing_schedules',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'sailing_schedule',
	},
	{
		api          : 'get_air_schedules',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'air_schedule',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_branches',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'create_contract_air_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_air_freight_service_additional_charge',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ftl_freight_service_additional_charges',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_air_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ftl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'duplicate_contract_ftl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ftl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ftl_freight_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ftl_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ftl_freight_rate_port_pair',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ftl_freight_service_rate_port_pairs',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ftl_freight_service_rates',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_draft',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ftl_freight_service_rate_status',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_service_details',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_location_clusters',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ftl_freight_service_additional_charge',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ftl_freight_service_additional_charge_status',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ltl_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_service_rate_bulk_import_sheet',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_service_rate_bulk_import_sheet',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ltl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'deactivate_contract_ltl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ltl_freight_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_air_freight_services',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_air_freight_additional_charges',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_air_freight_charge_codes',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ltl_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'deactivate_contract_ltl_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_ltl_freight_service_additional_charge',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_service_rate_bulk_import_sheet',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ltl_freight_service_additional_charges',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ltl_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_ltl_freight_service_rates',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'generate_contract_reference_id',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_air_freight_service',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_ltl_freight_service_additional_charge',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_service_rate_bulk_import_sheets',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_air_freight_service_rates',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_air_freight_service_rate',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_domestic_contract',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_search_checkout',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'process_contract_service_rate_bulk_import_sheet',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_air_freight_service_additional_charge',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_organization_branches',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_cycles',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_payment_modes',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'organization',
	},
	{
		api          : 'update_contract_instance',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'update_contract_instance_status',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'approve_contract_instance',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_bulk_import_sheet_template',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_instances',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_instance',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'duplicate_contract_ltl_freight_service_additional_charges',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'duplicate_contract_ftl_freight_service_additional_charges',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_services_utilisations',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'get_contract_stats',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_organization_payment_mode',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_organization_billing_cycle',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_service_shipment_details',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
	{
		api          : 'create_bulk_contract_utilisation',
		access_type  : 'private',
		feature      : 'contract',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_services_utilisations',
		access_type  : 'private',
		feature      : 'contract',
		service_name : 'contract',
	},
	{
		api          : 'create_contract_services_utilisations',
		access_type  : 'private',
		feature      : 'contract',
		service_name : 'contract',
	},
	{
		api          : 'update_bulk_contract_service_utilisations',
		access_type  : 'private',
		feature      : 'contract',
		service_name : 'contract',
	},
	{
		api          : 'list_contract_service_checkout_mappings',
		access_type  : 'private',
		feature      : 'contract',
		service_name : 'contract',
	},
	{
		api          : 'create_contract',
		access_type  : 'private',
		feature      : 'contract_rates',
		service_name : 'contract',
	},
];

export default apis;

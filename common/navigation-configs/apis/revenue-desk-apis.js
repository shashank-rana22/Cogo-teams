const apis = [
	{
		api          : 'list_fcl_freight_rates',
		access_type  : 'private',
		service_name : 'revenue',
	},
	{
		api         : 'list_lcl_grouped_shipments',
		access_type : 'private',
		// service_name: 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_buy_quotatios',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_services_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_consol_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_buy_quotations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_coload_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_pending_task',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'move_lcl_shipment_to_new_booking',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_manifest',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_manifest',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_rate_charge_codes',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_manifest',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'add_shipments_to_coload',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'add_shipments_to_consol',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_shipment_consol',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_manifest_invoice',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_domestic_air_freight_consol_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_domestic_air_grouped_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'create_domestic_air_request_balance',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_domestic_air_request_balances',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_revenue_desk_air_customs_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_air_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_ftl_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_haulage_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_ltl_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_customers_last_shipment_details',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_showed_rates',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'bulk_create_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'create_shipment_booking_confirmation_preference',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_revenue_desk_fcl_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_fcl_customs_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_lcl_freight_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'list_revenue_desk_lcl_customs_shipments',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
	{
		api          : 'get_shipment_transaction_insights',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_quotation',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_invoice_preference',
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
		api          : 'list_shipment_trade_partners',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_operating_procedures',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_audits',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_operating_procedure',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'send_booking_preference_email',
		access_type  : 'private',
		service_name : 'communication',
		feature      : 'revenue_desk',
	},
	{
		api          : 'get_contract_previous_service_providers',
		access_type  : 'private',
		service_name : 'unified_dashboard',
		feature      : 'revenue_desk',
	},
	{
		api          : 'list_shipment_currency_conversions',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_elligible_booking_document',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_revenue_desk_decisions',
		access_type  : 'private',
		service_name : 'revenue_desk',
	},
];

export default apis;

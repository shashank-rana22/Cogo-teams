const apis = [
	{
		api           : 'list_organizations',
		access_type   : 'private',
		feature       : 'organization',
		project_scope : ['partner'],
		service_name  : 'organization',
	},
	{
		api           : 'list_organization_users',
		access_type   : 'private',
		feature       : 'organization',
		project_scope : ['partner'],
		service_name  : 'organization',
	},
	{
		api          : 'onboard_organization_user',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'organization',
	},
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'shipment',
	},
	{
		api          : 'list_spot_searches',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'list_margins',
		access_type  : 'private',
		service_name : 'margin',
	},
	{
		api          : 'create_spot_search',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'list_checkouts',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'search',
	},
	{
		api          : 'create_organization_trade_party',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'organization',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'organization',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'organization',
	},
	{
		api          : 'create_organization_address',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'organization',
	},
	{
		api          : 'get_kam_promotion_stats',
		access_type  : 'private',
		service_name : 'promotion',
		feature      : 'promotion',
	},
	{
		api          : 'create_kam_promotion',
		access_type  : 'private',
		service_name : 'promotion',
		feature      : 'promotion',
	},
	{
		api          : 'publish_kam_promotion',
		access_type  : 'private',
		service_name : 'promotion',
		feature      : 'promotion',
	},
	{
		api          : 'get_incentive_user_detail_stat',
		access_type  : 'private',
		service_name : 'incentive',
	},
	{
		api          : 'create_spot_search_contract',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'contract',
	},
	{
		api          : 'list_spot_search_stats',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api         : 'get_saas_hs_code_list_commodities',
		access_type : 'private',
		feature     : 'hs_code',
	},
	{
		api          : 'update_spot_search',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'update_organization_billing_address',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api           : 'list_partner_users',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'partner',
	},
	{
		api           : 'send_checkout_quotation_emails',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'checkout',
	},
	{
		api          : 'create_spot_search_checkout',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'get_checkout',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api           : 'update_checkout_margin',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'checkout',
	},
	{
		api          : 'book_checkout',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_customize_quotation',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'create_organization_line_item_alias',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'list_rate_charge_codes',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'rate_sheet',
	},
	{
		api          : 'create_spot_search_rate_feedback',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'send_booking_confirmation_otp',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'verify_booking_confirmation_otp',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'create_checkout_service',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_service',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'create_spot_search_rate_request',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'get_organization_trade_party_payment_modes',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'send_credit_terms_and_condition',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'terms_and_condition',
	},
	{
		api          : 'get_organization_credit_severity',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'send_booking_whatsapp_confirmation',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'list_checkout_invoices',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'create_checkout_invoice',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_invoice',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'get_spot_search_schedules',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'send_verification_otp',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'verify_otp',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api         : 'get_saas_insurance_list_commodities',
		access_type : 'private',
		module      : 'insurance',
		feature     : 'insurance',
	},
	{
		api         : 'get_saas_insurance_rate',
		access_type : 'private',
		module      : 'insurance',
		feature     : 'insurance',
	},
	{
		api         : 'get_saas_insurance_country_supported',
		access_type : 'private',
		module      : 'insurance',
		feature     : 'insurance',
	},
	{
		api         : 'get_saas_hs_code_list',
		access_type : 'private',
		module      : 'hs-code',
		feature     : 'controlled checkout',
	},
	{
		api          : 'list_spot_search_rate_cards',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'add_spot_search_service',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'get_spot_search_schedule_weeks',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'get_spot_search_rate_card',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'remove_spot_search_service',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_freight_rate_min_price',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'fcl_freight_rate',
	},
	{
		api          : 'update_checkout_inco_term',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'checkout',
	},
	{
		api          : 'list_spot_search_rate_card_operators',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'checkout',
	},
	{
		api          : 'send_spot_search_rate_comparison_emails',
		access_type  : 'private',
		service_name : 'spot_search',
		feature      : 'search',
	},
	{
		api          : 'get_checkout_applicable_promocodes',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'update_checkout_promotion',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'promotion',
	},
	{
		api          : 'send_checkout_for_approval',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'checkout',
	},
	{
		api          : 'bulk_update_controlled_checkout_service',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'checkout',
	},
	{
		api          : 'create_planet_search_history',
		access_type  : 'private',
		service_name : 'location',
		feature      : 'search',
	},
	{
		api          : 'get_service_discovery_configuration',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'create_checkout',
		access_type  : 'private',
		service_name : 'checkout',
		feature      : 'spot_booking',
	},
	{
		api          : 'get_sailing_schedules',
		access_type  : 'private',
		feature      : 'spot_booking',
		service_name : 'sailing_schedule',
	},
];

export default apis;

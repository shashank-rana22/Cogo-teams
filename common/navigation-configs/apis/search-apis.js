const apis = [
	{
		api          : 'submit_organization_kyc',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'get_air_schedules',
		access_type  : 'private',
		service_name : 'air_schedule',
	},
	{
		api          : 'get_spot_search',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'get_recommended_spot_searches',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'update_spot_search',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'list_trade_contacts',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'trade',
	},
	{
		api           : 'list_organizations',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'organization',
	},
	{
		api          : 'update_organization_billing_address',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api           : 'list_organization_users',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'organization',
	},
	{
		api           : 'list_partner_users',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'partner',
	},
	{
		api          : 'list_alternate_spot_searches',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api           : 'list_store_quota',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'store',
	},
	{
		api          : 'list_spot_searches',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'create_spot_search',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'create_planet_search_history',
		access_type  : 'private',
		service_name : 'location',
	},
	{
		api          : 'get_organization_search_history',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_spot_search_negotiation',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api           : 'get_store_services',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'store',
	},
	{
		api           : 'create_store_order',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'store',
	},
	{
		api           : 'verify_payment',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'payment',
	},
	{
		api           : 'send_checkout_quotation_emails',
		access_type   : 'private',
		feature       : 'search',
		project_scope : ['partner'],
		service_name  : 'checkout',
	},
	{
		api          : 'create_spot_negotiation_comment',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'list_spot_negotiation_comments',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'get_payment_order_link',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'payment',
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
		api         : 'create_organization_trade_party',
		access_type : 'private',
		feature     : 'search',
	},
	{
		api         : 'list_organization_trade_parties',
		access_type : 'private',
		feature     : 'search',
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
		api          : 'create_spot_search_service',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'update_checkout_customize_quotation',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'partner',
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
		api          : 'create_trade_contact',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'trade',
	},
	{
		api          : 'list_dashboard_fcl_freight_rates',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'fcl_freight_rate',
	},
	{
		api          : 'update_organization_service',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_services',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'update_shipment_currency_conversion',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'shipment',
	},
	{
		api          : 'get_rfq',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'rfq',
	},
	{
		api          : 'create_spot_search_rate_feedback',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'list_checkouts',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'get_channel_partner',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner_verification',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'partner',
	},
	{
		api          : 'saas_get_user_active_plan',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'saas_subscriptions_v2',
	},
	{
		api          : 'saas_get_user_quota_usage',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'saas_subscriptions_v2',
	},
	{
		api          : 'onboard_organization_user',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
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
		api          : 'create_checkout',
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
		api          : 'get_checkout_indicative_prices',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'checkout',
	},
	{
		api          : 'create_fcl_freight_rate_task',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'fcl_freight_rate',
	},
	{
		api          : 'create_spot_search_rate_request',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'get_air_freight_incoterms',
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
		api          : 'create_terms_and_condition',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'terms_and_condition',
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
		api          : 'create_spot_search_contract',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
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
		api          : 'get_spot_search_indicative_prices',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_spot_search_shipment_insights',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'list_organization_branches',
		access_type  : 'private',
		service_name : 'organization',
		module       : 'insurance',
		feature      : 'insurance',
	},
	{
		api          : 'create_organization_address',
		access_type  : 'private',
		service_name : 'organization',
		module       : 'insurance',
		feature      : 'insurance',
	},
	{
		api         : 'get_saas_hs_code_list',
		access_type : 'private',
		module      : 'hs-code',
		feature     : 'controlled checkout',
	},
	{
		api          : 'create_organization_nomination',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_nominations',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_nomination',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_nomination',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'create_nominated_spot_search',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'spot_search',
	},
	{
		api          : 'create_nominee_trade_party',
		access_type  : 'private',
		feature      : 'search',
		service_name : 'organization',
	},
	{
		api          : 'get_spot_search_location_recommendations',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'list_spot_search_rate_cards',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'add_spot_search_service',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_spot_search_schedule_weeks',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_spot_search_rate_card',
		access_type  : 'private',
		service_name : 'spot_search',
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
	},
	{
		api          : 'list_spot_search_rate_card_operators',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'create_shipment_trade_partner_organization',
		access_type  : 'private',
		service_name : 'spot_search',
	},
];
export default apis;

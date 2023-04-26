const common_apis = {
	product_pricing: [
		{
			api          : 'get_store_services',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'create_store_order',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'verify_payment',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_payment_order_link',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'list_dashboard_fcl_freight_rates',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
	],
	app_dashboard: [
		{
			api          : 'assign_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_platform_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_store_quota',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'get_checkout',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'create_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'update_organization_search_history',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_shipment_sell_quotations',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_organization_search_history',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_app_dashboard_subscription',
			access_type  : 'private',
			service_name : 'saas_workspace',
		},
		{
			api          : 'get_app_dashboard_promotion',
			access_type  : 'private',
			service_name : 'saas_workspace',
		},
		{
			api          : 'get_app_dashboard_schedule',
			access_type  : 'private',
			service_name : 'saas_workspace',
		},
		{
			api          : 'get_app_dashboard_tracking',
			access_type  : 'private',
			service_name : 'saas_workspace',
		},
		{
			api          : 'list_dashboard_fcl_freight_rates',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},

		{
			api          : 'get_store_services',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'create_store_order',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'verify_payment',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_payment_order_link',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'get_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_requirement_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_coupons',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_credit_request_promotion',
			access_type  : 'private',
			service_name : 'credit',
		},
	],
	forecast: [
		{
			api          : 'create_forecast',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
		{
			api          : 'get_grouped_forecasts',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
		{
			api          : 'list_forecasts',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
		{
			api          : 'update_forecast',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
		{
			api          : 'get_forecast_trend',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
		{
			api          : 'get_forecast_stats',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'forecast',
		},
	],
	auto_quotation: [
		{
			api          : 'list_organization_trade_requirements_rates',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_trade_requirement_csv',
			access_type  : 'private',
			scope        : 'partner',
			service_name : 'organization',
		},
		{
			api          : 'get_trade_requirements_email_frequency',
			access_type  : 'private',
			scope        : 'partner',
			service_name : 'organization',
		},
		{
			api          : 'create_trade_requirements_email_frequency',
			access_type  : 'private',
			scope        : 'partner',
			service_name : 'organization',
		},
		{
			api          : 'list_communication_stats',
			access_type  : 'private',
			scope        : 'partner',
			service_name : 'communication',
		},
	],
	app_auto_quotation: [
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
	],
	app_accept_terms_and_conditions: [
		{
			api          : 'list_terms_and_conditions',
			access_type  : 'private',
			service_name : 'terms_and_condition',
		},
		{
			api          : 'accept_credit_terms_and_condition',
			access_type  : 'private',
			service_name : 'terms_and_condition',
		},
	],
	app_pay_later: [
		{
			api          : 'resubmit_credit_application_for_review',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_credit_application_comment',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_application_logs',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'apply_credit_request_coupon_code',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_request_poc_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_organization_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},

		{
			api          : 'check_organization_credit_eligibility',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'submit_credit_application_for_agreement_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'submit_credit_application_for_documentation_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_application_comments',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_tax_number_validity',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'update_organization_credit_request_payment_status',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_credit_request_store_order',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_company_finance_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'resubmit_credit_documents_for_review',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_organization_credit_allocation',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_application_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_requirement_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_coupons',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_credit_request_promotion',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_tax_numbers_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_request_status',
			access_type  : 'private',
			service_name : 'credit',
		},
	],
	trade_parties: [
		{
			api          : 'get_organization_trade_party_detail',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_party_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_sage_organization_id_mappings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_sage_organization_id_mapping',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	export_factoring: [
		{
			api          : 'get_credit',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_credit',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_credit',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_application_fee',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'apply_credit_coupon_code',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_tax_number_validity',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_tax_numbers_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_communications',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_company_finance_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_credit_poc_details',
			access_type  : 'private',
			service_name : 'credit',
		},

		{
			api          : 'create_export_factoring_buyer_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'submit_credit_for_agreement_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'submit_credit_for_documentation_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'resubmit_credit_for_review',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_credit_comments',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_credit_requirement_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_coupons',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_credit_promotion',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'add_buyer_poc',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_credit_comment',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_credit_status',
			access_type  : 'private',
			service_name : 'credit',
		},
	],
};
export default common_apis;

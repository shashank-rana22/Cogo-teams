import apis from './index';

const get_app_apis = (nav_apis) => nav_apis.filter(
	(api) => !api.project_scope || api.project_scope.includes('app'),
);

const app_apis = {
	app_dashboard      : [...apis.app_dashboard, ...apis.kyc],
	app_discover_rates : get_app_apis([
		...apis.search,
		...apis.kyc,
		...apis.cogopoints,
		...apis.checkout_promotions,
	]),
	app_documents                   : apis.document_walet,
	app_container_tracking          : apis.container_tracking,
	app_freight_rate_trend          : apis.freight_rate_trend,
	app_ocean_schedules             : apis.ocean_schedules,
	app_bookings                    : get_app_apis(apis.shipment),
	app_payments                    : apis.payments,
	app_settings                    : apis.app_settings,
	app_get_started                 : [],
	app_rms                         : apis.rms,
	app_pms                         : apis.pms,
	app_kyc                         : apis.kyc,
	app_pricing                     : apis.product_pricing,
	app_enquiries                   : apis.enquiry_supply,
	app_contract_rates              : apis.contract_rates,
	saas_tracking                   : [...apis.app_saas_tracking, ...apis.app_saas_dsr],
	saas_air_tracking               : apis.app_saas_air_tracking,
	saas_map_tracking               : apis.app_saas_map_tracking,
	saas_schedules                  : apis.app_saas_schedules,
	saas_air_schedules              : apis.app_saas_air_schedules,
	saas_subscription               : apis.app_saas_subscriptions,
	saas_freight_rate_trend         : apis.app_saas_freight_rate_trend,
	app_auto_quotation              : apis.app_auto_quotation,
	app_accept_terms_and_conditions : apis.app_accept_terms_and_conditions,
	app_pay_later                   : apis.app_pay_later,
	saas_cpq_products               : apis.app_saas_cpq_products,
	saas_cpq_contacts               : apis.app_saas_cpq_contacts,
	saas_cpq_dashboard              : apis.app_saas_cpq_dashboard,
	saas_create_quotation           : apis.app_saas_create_quotation,
	saas_edit_quotation             : apis.app_saas_edit_quotation,
	saas_view_quotation             : apis.app_saas_view_quotation,
	saas_quotation_list             : apis.app_saas_quotation_list,
	saas_create_purchase            : apis.app_saas_create_purchase,
	saas_edit_purchase              : apis.app_saas_edit_purchase,
	saas_view_purchase              : apis.app_saas_view_purchase,
	saas_purchase_list              : apis.app_saas_purchase_list,
	saas_create_invoice             : apis.app_saas_create_invoice,
	saas_edit_invoice               : apis.app_saas_edit_invoice,
	saas_view_invoice               : apis.app_saas_view_invoice,
	saas_invoice_list               : apis.app_saas_invoice_list,
	saas_app_quotation              : apis.app_saas_app_quotation,
	saas_hs_code_list               : apis.app_saas_hs_code_list,
	saas_cogopoint                  : apis.app_saas_cogopoint,
	saas_cogo_subscription          : apis.app_saas_cogo_subscription,
	saas_insurance                  : apis.app_saas_insurance,
	saas_transaction_history        : apis.app_saas_transaction_history,
	saas_trade_partner              : apis.app_saas_trade_partner,
	saas_product_inventory          : apis.app_saas_product_inventory,
	saas_premium_services           : apis.app_saas_premium_services,
<<<<<<< HEAD
	saas_trader_eligibility_check   : apis.saas_trader_eligibilty_check,
=======
	saas_order_history              : apis.app_saas_order_history,
>>>>>>> 61ef94a55e4110601a5a1ff26b8f2813227f97ed
};
export default app_apis;

import app_apis from './apis/get-app-apis';

const navigationMappingShipper = {
	app_dashboard: {
		key           : 'app_dashboard',
		title         : 'Dashboard',
		href          : '/dashboard',
		as            : '/dashboard',
		type          : 'link',
		icon          : 'nav-tasks',
		line          : true,
		main_apis     : [],
		possible_apis : [...app_apis.app_dashboard, ...app_apis.app_pay_later],
		module_type   : 'dashboards',
	},
	app_discover_rates: {
		key           : 'app_discover_rates',
		title         : 'Discover Rates',
		href          : '/book',
		as            : '/book',
		type          : 'link',
		tag           : 'New Search',
		icon          : 'nav-g-dollar',
		main_apis     : ['create_spot_search'],
		possible_apis : app_apis.app_discover_rates,
		module_type   : 'crm',
	},
	app_contract_rates: {
		key           : 'app_contract_rates',
		title         : 'Contract Rates',
		href          : '/contract-rates',
		as            : '/contract-rates',
		type          : 'link',
		icon          : 'nav-g-dollar',
		main_apis     : ['list_contracts'],
		possible_apis : app_apis.app_contract_rates,
		module_type   : 'crm',
	},
	saas_freight_rate_trend: {
		key           : 'saas_freight_rate_trend',
		title         : 'Freight Rate Trend',
		href          : '/saas/freight-rate-trend',
		as            : '/saas/freight-rate-trend',
		type          : 'link',
		icon          : 'nav-freight-trend',
		line          : true,
		main_apis     : ['list_freight_trend_subscriptions', 'list_freight_trend_rates'],
		possible_apis : app_apis.saas_freight_rate_trend,
		module_type   : 'crm',
	},
	app_auto_quotation: {
		key           : 'app_auto_quotation',
		title         : 'Active Quotations',
		href          : '/active-quotations',
		type          : 'link',
		icon          : 'nav-payments',
		line          : true,
		main_apis     : [],
		possible_apis : app_apis.app_auto_quotation,
		module_type   : 'dashboards',
	},
	app_accept_terms_and_conditions: {
		key           : 'app_accept_terms_and_conditions',
		title         : 'Terms and Conditions',
		href          : '/accept-terms-and-conditions',
		type          : 'link',
		icon          : 'nav-documents',
		main_apis     : [],
		possible_apis : app_apis.app_accept_terms_and_conditions,
		module_type   : 'dashboards',
		showInNav     : false,
	},
	app_documents: {
		key     : 'app_documents',
		title   : 'Documents',
		icon    : 'nav-documents',
		as      : '/documents/org_documents',
		href    : '/documents/[doc_type]',
		type    : 'link',
		options : [
			{
				title : 'Documents',
				type  : 'link',
				icon  : 'nav-MySchedules',
				as    : '/documents/org_documents',
				href  : '/documents/[doc_type]',
			},
			{
				title : 'Draft Templates',
				type  : 'link',
				icon  : 'nav-quotes',
				as    : '/documents/trade_documents',
				href  : '/documents/[doc_type]',
			},
		],
		main_apis     : ['list_organization_documents', 'list_trade_documents'],
		possible_apis : app_apis.app_documents,
		module_type   : 'dashboards',
	},
	saas_schedules: {
		key         : 'saas_schedules',
		title       : 'Schedules',
		icon        : 'nav-main-schedules',
		type        : 'link',
		module_type : 'dashboards',
		isSubNavs   : true,
		options     : [
			{
				key           : 'saas_schedules-map_dashboard',
				title         : 'My Schedules',
				icon          : 'nav-my-schedules',
				href          : '/saas/schedule-map-dashboard',
				as            : '/saas/schedule-map-dashboard',
				type          : 'link',
				main_apis     : [],
				possible_apis : app_apis.saas_map_tracking,
			},
			{
				key           : 'saas_schedules-air_schedules',
				title         : 'Air Schedules',
				href          : '/saas/air-schedules',
				as            : '/saas/air-schedules',
				type          : 'link',
				icon          : 'nav-air-schedules',
				main_apis     : [],
				possible_apis : app_apis.saas_air_schedules,
			},
			{
				key           : 'saas_schedules-ocean_schedules',
				title         : 'Ocean Schedules',
				href          : '/saas/schedules',
				as            : '/saas/schedules',
				type          : 'link',
				icon          : 'nav-ocean-schedules',
				main_apis     : [],
				possible_apis : app_apis.saas_schedules,
			},
		],
	},
	saas_cpq_contacts: {
		key           : 'saas_cpq_contacts',
		title         : 'Trade Partners',
		href          : '/saas/cpq/contacts',
		as            : '/saas/cpq/contacts',
		type          : 'link',
		icon          : 'nav-partner',
		main_apis     : [],
		possible_apis : app_apis.saas_cpq_contacts,
		module_type   : 'dashboards',
	},
	saas_cpq_products: {
		key           : 'saas_cpq_products',
		title         : 'Product Catalog',
		href          : '/saas/cpq/products',
		as            : '/saas/cpq/products',
		type          : 'link',
		line          : true,
		icon          : 'nav-catalog',
		main_apis     : [],
		possible_apis : app_apis.saas_cpq_products,
		module_type   : 'dashboards',
	},
	app_bookings: {
		key           : 'app_bookings',
		title         : 'Bookings',
		href          : '/shipments',
		as            : '/shipments',
		type          : 'link',
		icon          : 'nav-documents',
		main_apis     : ['list_shipments'],
		possible_apis : app_apis.app_bookings,
		module_type   : 'crm',
	},
	saas_tracking: {
		key       : 'saas_tracking',
		title     : 'Track & Trace',
		icon      : 'nav-container-tracking',
		type      : 'link',
		isSubNavs : true,
		options   : [
			{
				key           : 'saas_tracking-map_dashboard',
				title         : 'My Shipments',
				icon          : 'nav-my-schedules',
				href          : '/saas/map-dashboard',
				as            : '/saas/map-dashboard',
				type          : 'link',
				main_apis     : [],
				possible_apis : app_apis.saas_map_tracking,
			},
			{
				key           : 'saas_tracking-air_tracking',
				title         : 'Air Cargo Tracking',
				href          : '/saas/air-tracking',
				as            : '/saas/air-tracking',
				type          : 'link',
				icon          : 'nav-air-tracking',
				main_apis     : [],
				possible_apis : app_apis.saas_air_tracking,
			},
			{
				key           : 'saas_tracking-ocean_tracking',
				title         : 'Ocean Tracking',
				href          : '/saas/tracking',
				as            : '/saas/tracking',
				type          : 'link',
				icon          : 'nav-track-and-trace',
				main_apis     : [],
				possible_apis : app_apis.saas_tracking,
			},
		],
		module_type: 'dashboards',
	},
	hs_code_classification: {
		key           : 'hs_code_classification',
		title         : 'Product Classification',
		href          : '/saas/hs-classification',
		as            : '/saas/hs-classification',
		type          : 'link',
		icon          : 'nav-hscode',
		main_apis     : [],
		line          : true,
		possible_apis : app_apis.saas_hs_code_list,
		isNew         : true,
		module_type   : 'dashboards',
	},
	saas_cogo_subscription: {
		key         : 'saas_cogo_subscription',
		title       : 'Subscriptions',
		type        : 'link',
		icon        : 'nav-subscriptions',
		isSubNavs   : true,
		isNew       : true,
		showInNav   : true,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'saas_cogo_subscription-manage',
				title         : 'Manage Subscription',
				type          : 'link',
				icon          : 'nav-documents',
				href          : '/saas/cogo-subscriptions/manage-subscription',
				as            : '/saas/cogo-subscriptions/manage-subscription',
				main_apis     : [],
				possible_apis : app_apis.saas_cogo_subscription,
			},
			{
				key           : 'saas_cogo_subscription-balance_history',
				title         : 'Balance And History',
				type          : 'link',
				icon          : 'nav-payments',
				href          : '/saas/cogo-subscriptions/balance-history',
				as            : '/saas/cogo-subscriptions/balance-history',
				main_apis     : [],
				possible_apis : app_apis.saas_cogo_subscription,
			},
		],
	},
	saas_quotation: {
		key           : 'saas_quotation',
		title         : 'Quick Quotations',
		icon          : 'nav-quotation',
		type          : 'link',
		href          : '/saas/quickquotation/viewlist',
		as            : '/saas/quickquotation/viewlist',
		main_apis     : ['list_organizations'],
		possible_apis : app_apis.saas_app_quotation,
		isNew         : true,
		module_type   : 'dashboards',
	},
	saas_insurance: {
		key           : 'saas_insurance',
		title         : 'Insurance',
		href          : '/saas/insurance/list',
		as            : '/saas/insurance/list',
		type          : 'link',
		icon          : 'nav-insurance',
		main_apis     : [],
		possible_apis : app_apis.saas_insurance,
		module_type   : 'dashboards',
		isNew         : true,
		showInNav     : true,
	},
	saas_transaction_history: {
		key           : 'saas_transaction_history',
		title         : 'Transaction History',
		icon          : 'nav-transaction-history',
		type          : 'link',
		href          : '/saas/transaction-history',
		as            : '/saas/transaction-history',
		main_apis     : [],
		possible_apis : app_apis.saas_transaction_history,
		isNew         : true,
		module_type   : 'dashboards',
	},
	saas_subscription: {
		key           : 'saas_subscription',
		title         : 'Manage Subscriptions',
		href          : '/saas/subscriptions',
		as            : '/saas/subscriptions',
		type          : 'link',
		icon          : 'nav-subscriptions',
		main_apis     : [],
		possible_apis : app_apis.saas_subscription,
		module_type   : 'dashboards',
		showInNav     : false,
	},
	app_get_started: {
		key           : 'app_get_started',
		title         : 'Get Started',
		type          : 'modal',
		theme         : 'green',
		icon          : 'nav-checklist',
		main_apis     : [],
		possible_apis : app_apis.app_get_started,
		module_type   : 'dashboards',
	},

	app_kyc: {
		key           : 'app_kyc',
		title         : 'KYC',
		href          : '/kyc',
		as            : '/kyc',
		type          : 'link',
		icon          : 'nav-payments',
		line          : true,
		main_apis     : [],
		showInNav     : false,
		possible_apis : app_apis.app_kyc,
		module_type   : 'dashboards',
	},
	app_settings: {
		key           : 'app_settings',
		title         : 'Settings',
		href          : '/settings',
		as            : '/settings',
		type          : 'link',
		icon          : 'nav-payments',
		line          : true,
		main_apis     : [],
		showInNav     : false,
		possible_apis : app_apis.app_settings,
		module_type   : 'dashboards',
	},
	app_pricing: {
		key           : 'app_pricing',
		title         : 'Pricing',
		type          : 'link',
		icon          : 'nav-payments',
		line          : true,
		main_apis     : [],
		showInNav     : false,
		possible_apis : app_apis.app_pricing,
		module_type   : 'dashboards',
	},
	// saas_cogopoint: {
	// 	key: 'saas_cogopoint',
	// 	title: 'Cogopoints',
	// 	href: '/saas/cogopoint',
	// 	as: '/saas/cogopoint',
	// 	type: 'link',
	// 	line: true,
	// 	icon: 'nav-payments',
	// 	main_apis: [],
	// 	possible_apis: app_apis.saas_cogopoint,
	// 	module_type: 'dashboards',
	// 	onlyMobile: 'true',
	// },
	saas_trade_partner: {
		key           : 'saas_trade_partner',
		title         : 'Trade Partner',
		href          : '/saas/trade-partner',
		as            : '/saas/trade-partner',
		type          : 'link',
		icon          : 'nav-trade-partner',
		main_apis     : [],
		possible_apis : app_apis.saas_trade_partner,
		module_type   : 'dashboards',
		isNew         : true,
		showInNav     : true,
		line          : true,
	},
	payment_dashboard: {
		key           : 'payment_dashboard',
		title         : 'Payment Dashboard',
		href          : '/payment-dashboard',
		as            : '/payment-dashboard',
		type          : 'link',
		icon          : 'nav-payments',
		main_apis     : [],
		possible_apis : app_apis.app_payments,
		module_type   : 'dashboards',
	},

	saas_product_inventory: {
		key           : 'saas_product_inventory',
		title         : 'Product Catalog',
		href          : '/saas/product-inventory',
		as            : '/saas/product-inventory',
		type          : 'link',
		icon          : 'nav-catalog',
		main_apis     : [],
		possible_apis : app_apis.saas_product_inventory,
		module_type   : 'dashboards',
		isNew         : true,
		showInNav     : true,
	},
	saas_premium_services: {
		key         : 'saas_premium_services',
		title       : 'Premium Services',
		type        : 'link',
		icon        : 'nav-payments',
		module_type : 'dashboards',
		isNew       : true,
		showInNav   : true,
		isSubNavs   : true,
		options     : [
			{
				key           : 'saas_premium_services-duties_and_taxes',
				title         : 'Duties & Taxes Calculator',
				href          : '/saas/premium-services/duties-taxes-calculator',
				as            : '/saas/premium-services/duties-taxes-calculator',
				main_apis     : [],
				possible_apis : app_apis.saas_premium_services,
			},
		],
	},
};
export default navigationMappingShipper;

import app_apis from './apis/get-app-apis';

const navigationMappingSeller = {
	app_dashboard: {
		key           : 'app_dashboard',
		title         : 'Dashboard',
		href          : '/dashboard',
		as            : '/dashboard',
		type          : 'link',
		icon          : 'nav-tasks',
		line          : true,
		main_apis     : [],
		possible_apis : app_apis.app_dashboard,
		module_type   : 'dashboards',
	},
	saas_planning: {
		key         : 'saas_planning',
		title       : 'Planning',
		icon        : 'nav-planning',
		line        : true,
		isSubNavs   : true,
		showInNav   : true,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'saas_planning-quotation',
				title         : 'Quick Quotations',
				icon          : 'nav-quotation',
				type          : 'link',
				href          : '/saas/quickquotation/viewlist',
				as            : '/saas/quickquotation/viewlist',
				main_apis     : ['list_organizations'],
				possible_apis : app_apis.saas_app_quotation,
				module_type   : 'dashboards',
			},
			{
				key           : 'saas_planning-product_inventory',
				title         : 'Product Catalog',
				type          : 'link',
				icon          : 'nav-catalog',
				href          : '/saas/product-inventory',
				as            : '/saas/product-inventory',
				main_apis     : [],
				possible_apis : app_apis.saas_product_inventory,
				module_type   : 'dashboards',
			},
			{
				key           : 'saas_planning-trade_partner',
				title         : 'Trade Partner',
				type          : 'link',
				icon          : 'nav-trade-partner',
				href          : '/saas/trade-partner',
				as            : '/saas/trade-partner',
				main_apis     : [],
				possible_apis : app_apis.saas_trade_partner,
				module_type   : 'dashboards',
			},
		],
	},
	saas_premium_services: {
		key         : 'saas_premium_services',
		title       : 'Premium Services',
		type        : 'link',
		icon        : 'nav-premium-services',
		module_type : 'dashboards',
		isNew       : true,
		line        : true,
		showInNav   : true,
		isSubNavs   : true,
		options     : [
			{
				key           : 'saas_premium_services-duties_and_taxes',
				title         : 'Duties & Taxes Calculator',
				href          : '/saas/premium-services/duties-taxes-calculator',
				as            : '/saas/premium-services/duties-taxes-calculator',
				icon          : 'nav-payments',
				type          : 'link',
				main_apis     : [],
				possible_apis : app_apis.saas_premium_services,
			},
			{
				key           : 'saas_premium_services-order_history',
				title         : 'Order History',
				href          : '/saas/premium-services/order-history',
				as            : '/saas/premium-services/order-history',
				icon          : 'nav-transaction-history',
				main_apis     : [],
				possible_apis : app_apis.saas_order_history,
			},
			{
				key           : 'saas_premium_services-trader_eligibility_check',
				title         : 'Trader Eligibility Check',
				href          : '/saas/premium-services/trader-eligibility-check',
				as            : '/saas/premium-services/trader-eligibility-check',
				icon          : 'nav-trade-partner',
				main_apis     : [],
				possible_apis : app_apis.saas_trader_eligibility_check,
			},
		],
	},
	app_bookings: {
		key           : 'app_bookings',
		title         : 'Shipments',
		href          : '/shipments',
		as            : '/shipments',
		type          : 'link',
		icon          : 'nav-booking',
		main_apis     : ['list_shipments'],
		possible_apis : app_apis.app_bookings,
		module_type   : 'dashboards',
	},
	saas_cogo_insurance: {
		key           : 'saas_cogo_insurance',
		title         : 'Cargo Insurance',
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

	saas_tools: {
		key         : 'saas_tools',
		title       : 'Tools',
		icon        : 'nav-tools',
		isSubNavs   : true,
		showInNav   : true,
		isNew       : true,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'saas_tools-hs_code_classification',
				title         : 'Product Classification',
				href          : '/saas/hs-classification',
				as            : '/saas/hs-classification',
				type          : 'link',
				icon          : 'nav-hscode',
				main_apis     : [],
				possible_apis : app_apis.saas_hs_code_list,
			},
			{
				key           : 'saas_tools-air_tracking',
				title         : 'Air Tracking',
				href          : '/saas/air-tracking',
				as            : '/saas/air-tracking',
				type          : 'link',
				icon          : 'nav-air-tracking',
				main_apis     : [],
				possible_apis : app_apis.saas_air_tracking,
			},
			{
				key           : 'saas_tools-air_schedules',
				title         : 'Air Schedules',
				href          : '/saas/air-schedules',
				as            : '/saas/air-schedules',
				type          : 'link',
				icon          : 'nav-air-schedules',
				main_apis     : [],
				possible_apis : app_apis.saas_air_schedules,
			},
			{
				key           : 'saas_tools-ocean_tracking',
				title         : 'Ocean Tracking',
				href          : '/saas/tracking',
				as            : '/saas/tracking',
				type          : 'link',
				icon          : 'nav-track-and-trace',
				main_apis     : [],
				possible_apis : app_apis.saas_tracking,
			},
			{
				key           : 'saas_tools-ocean_schedules',
				title         : 'Ocean Schedules',
				href          : '/saas/schedules',
				as            : '/saas/schedules',
				type          : 'link',
				icon          : 'nav-ocean-schedules',
				main_apis     : [],
				possible_apis : app_apis.saas_schedules,
			},
			{
				key       : 'saas_tools-freight_rate_trend',
				title     : 'Freight Rate Trend',
				href      : '/saas/freight-rate-trend',
				as        : '/saas/freight-rate-trend',
				type      : 'link',
				icon      : 'nav-freight-trend',
				line      : true,
				main_apis : [
					'list_freight_trend_subscriptions',
					'list_freight_trend_rates',
				],
				possible_apis: app_apis.saas_freight_rate_trend,
			},
		],
	},
	saas_finance: {
		key         : 'saas_finance',
		title       : 'Finance',
		icon        : 'nav-finance',
		isSubNavs   : true,
		showInNav   : true,
		isNew       : true,
		line        : true,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'saas_finance-transaction_history',
				title         : 'Transaction History',
				icon          : 'nav-transaction-history',
				type          : 'link',
				href          : '/saas/transaction-history',
				as            : '/saas/transaction-history',
				main_apis     : [],
				possible_apis : app_apis.saas_transaction_history,
				module_type   : 'dashboards',
			},
			{
				key           : 'saas_finance-payment_dashboard',
				title         : 'Payment Dashboard',
				href          : '/payment-dashboard',
				as            : '/payment-dashboard',
				type          : 'link',
				icon          : 'nav-payments',
				main_apis     : [],
				possible_apis : app_apis.app_payments,
				module_type   : 'dashboards',
			},
		],
	},
	app_rms: {
		key         : 'app_rms',
		title       : 'Rate Management',
		icon        : 'nav-g-dollar',
		module_type : 'crm',
		main_apis   : [
			'list_fcl_freight_rates',
			'list_fcl_freight_rate_locals',
			'list_fcl_freight_rate_local_suggestions',
			'list_ftl_freight_rates',
			'list_ltl_freight_rates',
			'list_haulage_freight_rates',
			'list_lcl_customs_rates',
			'list_lcl_freight_rates',
			'list_rate_sheets',
			'list_air_freight_rates',
			'list_fcl_cfs_rates',
			'list_fcl_customs_rates',
			'list_air_customs_rates',
			'list_subsidiary_service_rates',
		],
		possible_apis : app_apis.app_rms,
		options       : [
			{
				title : 'FCL Freight',
				type  : 'link',
				as    : '/rate-management/fcl-freight',
				href  : '/rate-management/[service]',
			},
			{
				title : 'LCL Freight',
				type  : 'link',
				as    : '/rate-management/lcl-freight/freight',
				href  : '/rate-management/[service]/[module]',
			},
			{
				title : 'Air Freight',
				type  : 'link',
				as    : '/rate-management/air-freight/freight',
				href  : '/rate-management/[service]/[module]',
			},
			{
				title : 'FTL Transportation',
				type  : 'link',
				as    : '/rate-management/ftl-freight/freight',
				href  : '/rate-management/[service]/[module]',
			},
			{
				title : 'Haulage Freight',
				type  : 'link',
				as    : '/rate-management/haulage-freight/haulage-charges',
				href  : '/rate-management/[service]/[module]',
			},
			{
				title   : 'FCL Customs',
				as      : '/rate-management/fcl-customs/custom-clearance',
				href    : '/rate-management/[service]/[module]',
				service : 'fcl-customs',
			},
			{
				title   : 'LCL Customs',
				as      : '/rate-management/lcl-customs/custom-clearance',
				href    : '/rate-management/[service]/[module]',
				service : 'lcl-customs',
			},
			{
				title : 'LTL Transportation',
				as    : '/rate-management/ltl-freight/freight',
				href  : '/rate-management/[service]/[module]',
				type  : 'link',
			},
			{
				title : 'Air Customs',
				as    : '/rate-management/air-customs/custom-clearance',
				href  : '/rate-management/[service]/[module]',
				type  : 'link',
			},
			{
				title : 'FCL CFS',
				as    : '/rate-management/fcl-cfs/cfs-clearance',
				href  : '/rate-management/[service]/[module]',
				type  : 'link',
			},
			{
				title : 'Additional Services',
				as    : '/rate-management/additional-service/fcl_freight',
				href  : '/rate-management/[service]/[module]',
				type  : 'link',
			},
		],
	},
	app_pms: {
		key       : 'app_pms',
		title     : 'Port Management',
		icon      : 'nav-g-dollar',
		main_apis : [
			'list_fcl_freight_rate_locals',
			'list_organization_serviceable_ports',
		],
		module_type   : 'crm',
		possible_apis : app_apis.app_pms,
		options       : [
			{
				title : 'Origin Ports',
				href  : '/port-management/[type]',
				as    : '/port-management/origin',
				type  : 'link',
			},
			{
				title : 'Destination Ports',
				href  : '/port-management/[type]',
				as    : '/port-management/destination',
				type  : 'link',
			},
		],
	},
	app_enquiries: {
		key           : 'app_enquiries',
		title         : 'Enquiries',
		icon          : 'nav-g-dollar',
		href          : '/enquiries',
		as            : '/enquiries',
		type          : 'link',
		main_apis     : ['list_spot_searches'],
		module_type   : 'crm',
		possible_apis : app_apis.app_enquiries,
	},
	app_documents: {
		key         : 'app_documents',
		title       : 'Documents',
		icon        : 'nav-documents',
		type        : 'link',
		as          : '/documents/org_documents',
		href        : '/documents/[doc_type]',
		module_type : 'crm',
		options     : [
			{
				title : 'Documents',
				type  : 'link',
				as    : '/documents/org_documents',
				icon  : 'nav-MySchedules',
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
	},
	saas_schedules: {
		key         : 'saas_schedules',
		title       : 'Schedules',
		icon        : 'nav-main-schedules',
		type        : 'link',
		module_type : 'dashboards',
		isSubNavs   : true,
		showInNav   : false,
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
		],
	},
	saas_cpq_contacts: {
		key           : 'saas_cpq_contacts',
		title         : 'Trade Partners',
		href          : '/saas/cpq/contacts',
		as            : '/saas/cpq/contacts',
		type          : 'link',
		icon          : 'nav-partner',
		main_apis     : app_apis.saas_cpq_contacts,
		possible_apis : [],
		module_type   : 'dashboards',
	},
	saas_cpq_products: {
		key           : 'saas_cpq_products',
		title         : 'Product Catalog',
		href          : '/saas/cpq/products',
		as            : '/saas/cpq/products',
		type          : 'link',
		icon          : 'nav-catalog',
		main_apis     : app_apis.saas_cpq_products,
		possible_apis : [],
		module_type   : 'dashboards',
	},
	saas_tracking: {
		key       : 'saas_tracking',
		title     : 'Track & Trace',
		icon      : 'nav-container-tracking',
		type      : 'link',
		isSubNavs : true,
		showInNav : false,
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
		],
		module_type: 'dashboards',
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
				href          : '/saas/cogo-subscription/manage-subscription',
				as            : '/saas/cogo-subscription/manage-subscription',
				main_apis     : [],
				possible_apis : app_apis.saas_cogo_subscription,
			},
			{
				key           : 'saas_cogo_subscription-balance_history',
				title         : 'Balance And History',
				type          : 'link',
				icon          : 'nav-payments',
				href          : '/saas/cogo-subscription/balance-history',
				as            : '/saas/cogo-subscription/balance-history',
				main_apis     : [],
				possible_apis : app_apis.saas_cogo_subscription,
			},
		],
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
	},
	app_accept_terms_and_conditions: {
		key           : 'app_accept_terms_and_conditions',
		title         : 'Terms and Conditions',
		href          : '/accept-terms-and-conditions',
		type          : 'link',
		icon          : 'nav-documents',
		main_apis     : [],
		showInNav     : false,
		possible_apis : app_apis.app_accept_terms_and_conditions,
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
	saas_cogostore: {
		key           : 'saas_cogostore',
		title         : 'cogo store',
		href          : '/saas/cogo-store',
		as            : '/saas/cogo-store',
		type          : 'link',
		line          : true,
		showInNav     : true,
		icon          : 'nav-payments',
		main_apis     : [],
		possible_apis : app_apis.saas_cogostore,
		module_type   : 'dashboards',
	},
};
export default navigationMappingSeller;

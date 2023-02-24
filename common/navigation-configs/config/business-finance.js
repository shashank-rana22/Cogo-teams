const businessFinance = {
	'/[partner_id]/business-finance': {
		navigation : 'business_finance',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/coe-finance/[active_tab]': {
		navigation : 'business_finance-coe_finance',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/coe-finance/[active_tab]/[view]': {
		navigation: 'business_finance-coe_finance',
	},
	'/[partner_id]/business-finance/coe-finance/[active_tab]/view-invoices': {
		navigation: 'business_finance-coe_finance',
	},
	'/[partner_id]/business-finance/coe-finance/all_invoices/view-invoices': {
		navigation: 'business_finance-coe_finance',
	},
	'/[partner_id]/business-finance/coe-finance/cost-sheet': {
		navigation: 'business_finance-coe_finance',
	},
	'/[partner_id]/business-finance/translate-account-receivables/[activeTab]': {
		navigation : 'business_finance-account_receivables_translate',
		isMainNav  : true,
	},

	'/[partner_id]/business-finance/incident-management/[activeTab]': {
		navigation: 'business_finance-incident_management',
	},

	'/[partner_id]/business-finance/reports': {
		navigation : 'business_finance-reports',
		isMainNav  : true,
	},
};

export default businessFinance;

const businessFinance = {
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

	'/[partner_id]/business-finance/account-payables/[active_tab]': {
		navigation : 'business_finance-account_payables',
		isMainNav  : true,
	},
};

export default businessFinance;

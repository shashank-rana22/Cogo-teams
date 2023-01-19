const businessFinance = {
	'/[partner_id]/business-finance': {
		navigation : 'business_finance',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/account-payables': {
		navigation : 'business_finance-account_payables',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/account-receivables': {
		navigation : 'business_finance-account_receivables',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/product-code-mappings': {
		navigation : 'business_finance-product_code_mapping',
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
};

module.exports = businessFinance;

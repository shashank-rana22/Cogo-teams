const businessConfig = {
	'/[partner_id]/business-finance/account-payables': {
		navigation : 'business_finance-account_payables',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/account-receivables': {
		navigation : 'business_finance-account_receivables',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/product-code-mappings': {
		navigation : 'product_code_mapping',
		isMainNav  : true,
	},
	'/[partner_id]/business-finance/coe-finance/[active_tab]': {
		navigation: 'coe_finance',
	},
	'/[partner_id]/business-finance/coe-finance/[active_tab]/view-invoices': {
		navigation: 'coe_finance',
	},

};

export default businessConfig;

const conditionConstants = {
	SEE_CREATE_PAYRUN_ALLOWED: [
		{
			type          : 'api',
			value         : 'post_purchase_payrun',
			in_navigation : 'business_finance-account_payables',
		},
		{
			type          : 'api',
			value         : 'get_purchase_payrun_list_supplier',
			in_navigation : 'business_finance-account_payables',
		},
		{
			type          : 'api',
			value         : 'delete_purchase_payrun_suppliers',
			in_navigation : 'business_finance-account_payables',
		},
	],
};

export default conditionConstants;

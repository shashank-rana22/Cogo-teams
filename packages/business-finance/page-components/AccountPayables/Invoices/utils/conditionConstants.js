const conditionConstants = {
	SEE_RELEASE_ACTION: [
		{
			type          : 'api',
			value         : 'put_purchase_bills_by_id_release',
			in_navigation : 'business_finance-account_payables',
		},
	],
	SEE_ACTIONS: [
		{
			type          : 'api',
			value         : 'put_purchase_bills_by_id_dispute',
			in_navigation : 'business_finance-account_payables',
		},
		{
			type          : 'api',
			value         : 'put_purchase_bills_by_id_reject',
			in_navigation : 'business_finance-account_payables',
		},
	],
};

export default conditionConstants;

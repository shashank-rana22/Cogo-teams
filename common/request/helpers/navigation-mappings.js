const navigationMappings = {
	home: {
		key       : 'home',
		title     : 'Home',
		href      : '/home',
		as        : '/home',
		main_apis : ['list_shipments'],
	},
	business_finance: {
		key       : 'business_finance',
		title     : 'Business Finance',
		href      : '/business-finance',
		as        : '/business-finance',
		main_apis : ['get_purchase_payment_upload_list'],
		options   : [
			{
				key           : 'business_finance-account_payables',
				title         : 'Account Payables',
				href          : '/business-finance/account_payables',
				as            : '/business-finance/account_payables',
				type          : 'link',
				main_apis     : ['get_purchase_payable_bill_company_list'],
				possible_apis : [
					{
						api         : 'create_organization_document',
						access_type : 'private',
					},
					{
						api         : 'list_organization_trade_parties',
						access_type : 'private',
					},
					{
						api         : 'get_shipment_cost_sheet',
						access_type : 'private',
					},
					{
						api         : 'list_organization_documents',
						access_type : 'private',
					},
				],
			},
		],
	},
};

export default navigationMappings;

import { IcMBookingDesk } from '@cogoport/icons-react';

const navigationMappings = {
	home: {
		key       : 'home',
		title     : 'Home',
		href      : '/home',
		as        : '/home',
		icon      : <IcMBookingDesk />,
		main_apis : ['list_shipments'],
	},
	business_finance: {
		key       : 'business_finance',
		title     : 'Business Finance',
		href      : '/business-finance',
		as        : '/business-finance',
		icon      : <IcMBookingDesk />,
		main_apis : ['get_purchase_payment_upload_list'],
		options   : [
			{
				key       : 'business_finance-account_payables',
				title     : 'Account Payables',
				href      : '/business-finance/account-payables',
				as        : '/business-finance/account-payables',
				icon      : <IcMBookingDesk />,
				main_apis : ['get_purchase_payable_bill_company_list'],
			},
			{
				key       : 'business_finance-account_receivables',
				title     : 'Account Receivables',
				href      : '/business-finance/account-receivables',
				as        : '/business-finance/account-receivables',
				icon      : <IcMBookingDesk />,
				main_apis : ['get_sales_dashboard_collection_trend'],
			},
			{
				key       : 'product_code_mapping',
				title     : 'Product Code Mappings',
				href      : '/business-finance/product-code-mappings',
				as        : '/business-finance/product-code-mappings',
				icon      : <IcMBookingDesk />,
				main_apis : ['get_common_item'],
			},
		],
	},
	coe: {
		key       : 'coe',
		title     : 'Center of Excellence',
		href      : '/coe',
		as        : '/coe',
		icon      : <IcMBookingDesk />,
		main_apis : ['list_shipments'],
		options   : [
			{
				key       : 'revenue-desk_fcl-freight',
				title     : 'FCL Revenue Desk',
				href      : '/revenue-desk/fcl-freight',
				as        : '/revenue-desk/fcl-freight',
				icon      : <IcMBookingDesk />,
				main_apis : ['list_shipments'],
			}
		]
	}

};

export default navigationMappings;

import { IcMBookingDesk } from '@cogoport/icons-react';

export const nav = [
	{
		icon : <IcMBookingDesk />,
		name : 'Home',
		href : '/home',
		as   : '/home',
	},
	{
		icon      : <IcMBookingDesk />,
		name      : 'Business Finance',
		isSubNavs : true,
		options   : [
			{
				icon : <IcMBookingDesk />,
				name : 'AP',
				href : '/business-finance/account-payables',
				as   : '/business-finance/account-payables',
			},
			{
				icon : <IcMBookingDesk />,
				name : 'AR',
				href : '/business-finance/account-receivables',
				as   : '/business-finance/account-receivables',
			},
			{
				icon : <IcMBookingDesk />,
				name : 'Product Code Mappings',
				href : '/business-finance/product-code-mappings',
				as   : '/business-finance/product-code-mappings',
			}],
	},
];

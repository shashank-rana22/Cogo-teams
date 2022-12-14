import { IcMBookingDesk } from '@cogoport/icons-react';

export const nav = [
	{
		icon : <IcMBookingDesk />,
		name : 'Home',
		href : '/home',
	},
	{
		icon      : <IcMBookingDesk />,
		name      : 'Business Finance',
		issubnavs : true,
		options   : [
			{
				icon : <IcMBookingDesk />,
				name : 'AP',
				href : '/muneem/account-payables',
			},
			{
				icon : <IcMBookingDesk />,
				name : 'AR',
				href : '/muneem/account-receivables',
			}],
	},
	{
		icon : <IcMBookingDesk />,
		name : 'Product Code Mappings',
		href : '/muneem/product-code-mappings',
	},
];

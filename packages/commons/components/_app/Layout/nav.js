import { IcMBookingDesk, IcMAccountSettings } from '@cogoport/icons-react';

export const nav = [
	{
		icon : <IcMBookingDesk />,
		name : 'Home',
		href : '/',
	},
	{
		icon : <IcMBookingDesk />,
		name : 'FCL Customs Rate List',
		href : '/rates/fcl-customs',
	},
	{
		icon : <IcMBookingDesk />,
		name : 'FCL Freight Locations',
		href : '/rates/fcl-freight/locations',
	},
	{
		icon : <IcMAccountSettings />,
		name : 'FCL Customs Locations',
		href : '/rates/fcl-customs/locations',
	},
];

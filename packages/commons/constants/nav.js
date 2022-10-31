import { IcMBookingDesk, IcMAccountSettings } from '@cogoport/icons-react';

export const nav = [
	{
		icon : <IcMBookingDesk />,
		name : 'Locations',
		href : `${process.env.URL_RATES_FCL_FREIGHT}/locations`,
	},
	{
		icon : <IcMAccountSettings />,
		name : 'Rates',
		href : `${process.env.URL_RATES_FCL_CUSTOMS}/rates`,
	},
];

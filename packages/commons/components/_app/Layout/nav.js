import { IcMBookingDesk, IcMAccountSettings } from '@cogoport/icons-react';

export const nav = [
	{
		icon : <IcMBookingDesk />,
		name : 'FCL Freight Locations',
		href : `${process.env.URL_RATES_FCL_FREIGHT}/rates/fcl-freight/locations`,
	},
	{
		icon : <IcMAccountSettings />,
		name : 'Customs Locations',
		href : `${process.env.URL_RATES_FCL_CUSTOMS}/rates/fcl-customs/locations`,
	},
];

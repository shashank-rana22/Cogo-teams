import {
	IcMFrupee,
	IcMFdollar,
	IcMFeuro,
	IcMFpound,
	IcMFsingaporeDollar,
} from '@cogoport/icons-react';
import React from 'react';

const CURRENCY_DATA = [
	{ id: '1', icon: <IcMFrupee width={25} height={25} />, text: 'INR' },
	{ id: '2', icon: <IcMFdollar width={25} height={25} />, text: 'USD' },
	{
		id   : '3',
		icon : <IcMFsingaporeDollar width={25} height={25} />,
		text : 'SGD',
	},
	{ id: '4', icon: <IcMFpound width={25} height={25} />, text: 'GBP' },
	{ id: '5', icon: <IcMFeuro width={25} height={25} />, text: 'EUR' },
];
const POC_DATA_MAPPING = [
	{ id: '1', label: 'Customer Information' },
	{ id: '2', label: 'Timeline' },
];

export { CURRENCY_DATA, POC_DATA_MAPPING };

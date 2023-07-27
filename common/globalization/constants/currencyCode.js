import {
	IcMFrupee,
	IcMFdollar,
	IcMFeuro,
	IcMFpound,
	IcMFsingaporeDollar,
	IcMFdong,
	IcMFyen,
} from '@cogoport/icons-react';

export default {
	INR : 'INR',
	USD : 'USD',
	EUR : 'EUR',
	GBP : 'GBP',
	AED : 'AED',
	VND : 'VND',
	HKD : 'HKD',
	JPY : 'JPY',
	SGD : 'SGD',
	CAD : 'CAD',
	IDR : 'IDR',
	THB : 'THB',
	CNY : 'CNY',
};

export const CURRENCY_MAPPING = {
	INR: {
		icon: IcMFrupee,
	},
	USD: {
		icon: IcMFsingaporeDollar,
	},
	SGD: {
		icon: IcMFdollar,
	},
	GBP: {
		icon: IcMFpound,
	},
	EUR: {
		icon: IcMFeuro,
	},
	VND: {
		icon: IcMFdong,
	},
	CNY: {
		icon: IcMFyen,
	},
};

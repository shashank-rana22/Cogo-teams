export const TAB_NAME = ['AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'];
export const INNER_TAB_MAPPING = [
	{ title: 'Domestic', name: 'NORMAL' },
	{ title: 'Overseas', name: 'OVERSEAS' },
	{ title: 'Adv.Payment', name: 'ADVANCE_PAYMENT' },
];
export const PAID_INNER_TAB_MAPPING = [
	{ title: 'Domestic', name: 'NORMAL' },
	{ title: 'Adv.Payment', name: 'ADVANCE_PAYMENT' },
];
export const SHOW_TOGGLE_TAB_NAME = ['AUDITED', 'PAYMENT_INITIATED', 'COMPLETED', 'INITIATED'];
export const SHOW_DOWNLOAD_BUTTON_TAB_NAME = ['PAYMENT_INITIATED', 'COMPLETED'];
export const SAMPLE_LINK =	'https://cogoport-testing.sgp1.digitaloceanspaces.com/06679b4fca57'
+ 'a312ee8f3fe0ded72246/UTRuploadSampleFile.xlsx';
export const ADVANCE_SAMPLE_LINK =	'https://cogoport-production.sgp1.digitaloceanspaces.com/0af71f459488aae5'
+ '9e95d4e38a4271ff/UTRuploadSampleFileForAdvancePayment.xlsx';
export const RIBBON_COLOR_MAPPING = {
	NORMAL          : '#FEF1DF',
	OVERSEAS        : '#CDF7D4',
	OVERHEADS       : '#7DD6FF',
	ADVANCE_PAYMENT : '#C4DC91',
};
export const RIBBON_VALUE_MAPPING = {
	NORMAL          : 'DOMESTIC',
	OVERSEAS        : 'OVERSEAS',
	ADVANCE_PAYMENT : 'Adv.Payment',
};

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
export const INVOICE_DATA_MAPPING = [
	{ id: '1', label: 'Profitability' },
	{ id: '2', label: 'Supplier Information' },
	{ id: '3', label: 'Customer Information' },
	{ id: '4', label: 'Invoice Timeline' },
];

export const DETAILS = [
	{ label: 'Overall Expense', key: 'overallExpense' },
	{ label: 'Total Payables', key: 'totalPayables' },
	{ label: 'Overall Income', key: 'overallIncome' },
	{ label: 'Total Receivable', key: 'totalReceivable' },
];

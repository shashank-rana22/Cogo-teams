import { CURRENCY_MAPPING } from '@cogoport/globalization/constants/currencyCode';

export const CURRENCY_DATA = Object.entries(CURRENCY_MAPPING).map(([key, value]) => ({
	id   : key,
	icon : value.icon,
	text : key,
}));

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

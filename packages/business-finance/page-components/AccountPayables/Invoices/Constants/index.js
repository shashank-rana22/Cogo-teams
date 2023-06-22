import { CURRENCY_MAPPING } from '@cogoport/globalization/constants/currencyCode';

const CURRENCY_ICON_MAPPING = Object.keys(CURRENCY_MAPPING).reduce((prev, curr) => ({
	...prev,
	[curr]: CURRENCY_MAPPING[curr].icon,
}), {});

const getContentMapping = ({ width, height, mapping }) => Object.entries(mapping).reduce((pv, [key, Icon]) => ({
	...pv,
	...(Icon && { [key]: <Icon width={width} height={height} /> }),
}), {});

const CURRENCY_DATA_MAPPING = getContentMapping({
	width   : 25,
	height  : 25,
	mapping : CURRENCY_ICON_MAPPING,
});

export const CURRENCY_DATA = Object.keys(CURRENCY_DATA_MAPPING).map(
	(currency) => ({
		id   : currency,
		icon : CURRENCY_DATA_MAPPING[currency],
		text : currency,
	}),
);

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

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

export const CATEGORY_OPTIONS = [
	{
		value : 'normal_payrun',
		label : 'Domestic Payment',
	},
	{
		value : 'overseas_agent',
		label : 'Overseas Payment',
	},
];

export const EXPENSE_OPTIONS = [
	{
		value : 'overheads',
		label : 'Overheads',
	},
];

export const OPTION_AIR = [
	{
		label : 'DO',
		value : 'do',
	},
	{
		label : 'HAWB',
		value : 'hawb',
	},
	{
		label : 'MAWB',
		value : 'mawb',
	},
];
export const OPTIONS = [
	{
		label : 'MBL',
		value : 'mbl',
	},
	{
		label : 'HBL',
		value : 'hbl',
	},
];

export const SERVICE_TYPE = [
	{ value: 'fcl_freight', label: 'FCL' },
	{ value: 'lcl_freight', label: 'LCL' },
	{ value: 'air_freight', label: 'AIR' },
	{ value: 'fcl_customs', label: 'FCL Customs' },
	{ value: 'lcl_customs', label: 'LCL Customs' },
	{ value: 'air_customs', label: 'AIR Customs' },
	{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
];

export const REMARKS = [
	{ name: 'MARK DISPUTED', value: 'DISPUTE' },
	{ name: 'FINANCE REJECT', value: 'PUSH TO COE FINANCE' },
];

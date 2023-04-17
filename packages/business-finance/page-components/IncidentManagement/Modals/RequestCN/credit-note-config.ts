import { startCase } from '@cogoport/utils';

export const CATEGORY_OPTIONS = [
	{ label: 'Revenue Impacting', value: 'REVENUE_IMPACTING' },
	{ label: 'Non-Revenue Impacting', value: 'NON_REVENUE_IMPACTING' },
];
export const REVENUE_OPTIONS = [
	{ label: 'Invoicing Currency Change', value: 'Invoicing Currency Change' },
	{ label: 'Line Item Currency Change', value: 'Line Item Currency Change' },
	{
		label : 'Invoicing Preference Change',
		value : 'Invoicing Preference Change',
	},
	{ label: 'Line Item Amount Change', value: 'Line Item Amount Change' },
	{ label: 'Line Item Quantity Change', value: 'Line Item Quantity Change' },
	{ label: 'Extra Payment Received', value: 'Extra Payment Received' },
	{
		label : 'Line Item Exchange Rate Change',
		value : 'Line Item Exchange Rate Change',
	},
	{
		label : 'Quotation - Invoice Amount Mismatch',
		value : 'Quotation - Invoice Amount Mismatch',
	},
	{ label: 'Others (Capture Remarks)', value: 'revenueOthers' },
];
export const NON_REVENUE_OPTIONS = [
	{ label: 'Customer Address Change', value: 'Customer Address Change' },
	{ label: 'Invoice Date Change', value: 'Invoice Date Change' },
	{ label: 'GST Change', value: 'GST Change' },
	{ label: 'Billing Party Name Change', value: 'Billing Party Name Change' },
	{ label: 'Others (Capture Remarks)', value: 'nonRevenueOthers' },
];
export const NON_REVENUE_DATA = [
	'Customer Address Change',
	'Invoice Date Change',
	'GST Change',
	'Billing Party Name Change',
];

export const requestCreditNoteColumns = () => [
	{
		Header   : 'Name',
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : 'Unit',
		accessor : 'unit',
		id       : 'unit',
		Cell     : ({ row: { original } }) => {
			const formattedUnit = startCase(original.unit);
			return formattedUnit;
		},
	},
	{
		Header   : 'Currency',
		accessor : 'currency',
		id       : 'currency',
	},
	{
		Header   : 'Ex. Rate',
		accessor : 'exchangeRate',
		id       : 'exchangeRate',
	},
	{
		Header   : 'Price',
		accessor : 'rate',
		id       : 'rate',
	},
	{
		Header   : 'Quantity',
		accessor : 'quantity',
		id       : 'quantity',
	},
	{
		Header   : 'Sub Total',
		accessor : 'subTotal',
		id       : 'subTotal',
	},
	{
		Header   : 'Grand Total',
		accessor : 'grandTotal',
		id       : 'grandTotal',
	},
];

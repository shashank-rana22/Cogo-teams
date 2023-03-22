export const companyType = [
	{
		label : 'Private Limited',
		value : 'private_limited',
	},
	{
		label : 'Public Limited',
		value : 'public_limited',
	},
	{
		label : 'Limited Liability Partnership',
		value : 'limited_liability_partnership',
	},
	{
		label : 'Partnership',
		value : 'partnership',
	},
	{
		label : 'Proprietorship',
		value : 'proprietorship',
	},
	{
		label : 'Other',
		value : 'other',
	},
];

export const DUE_IN = [
	{
		label : 'Not Due',
		value : 'amount_not_due',
	},
	{
		label : '1-30 Days',
		value : 'amount_1_30',
	},
	{
		label : '31-60 Days',
		value : 'amount_31_60',
	},
	{
		label : '61-90 Days',
		value : 'amount_61_90',
	},
	{
		label : '91-180 Days',
		value : 'amount_91_180',
	},
	{
		label : '181-365 Days',
		value : 'amount_181_365',
	},
	{ label: '365+ Days', value: 'amount_365' },
];

export const SALES_AGENT = [
	{
		label : 'Total Outstanding Amount',
		value : 'total_outstanding_amount',
	},
	{
		label : 'Open Invoice Amount',
		value : 'open_invoice_amount',
	},
	{
		label : 'On Account Amount',
		value : 'on_account_amount',
	},
];

export const SEARCH_OPTIONS = [
	{
		label : 'Trade Party Serial Id',
		value : 'tradePartySerialId',
	},
	{
		label : 'Sage ID',
		value : 'sageId',
	},
	{
		label : 'Serial Id',
		value : 'organizationSerialId',
	},
	{
		label : 'Business Name/Pan Number',
		value : 'q',
	},
];

export const SORTBY_OPTION = [
	{
		label : 'Not Due',
		value : 'amount_not_due',
	},
	{
		label : '1-30 Days',
		value : 'amount_1_30',
	},
	{
		label : '31-60 Days',
		value : 'amount_31_60',
	},
	{
		label : '61-90 Days',
		value : 'amount_61_90',
	},
	{
		label : '91-180 Days',
		value : 'amount_91_180',
	},
	{
		label : '181-365 Days',
		value : 'amount_181_365',
	},
	{ label: '365+ Days', value: 'amount_365' },
	{
		label : 'Total Outstanding Amount',
		value : 'total_outstanding_amount',
	},
	{
		label : 'Open Invoice Amount',
		value : 'open_invoice_amount',
	},
	{
		label : 'On Account Amount',
		value : 'on_account_amount',
	},
];

export const CARD_DETAILS = [
	{
		label    : 'Pan Number',
		valueKey : 'registrationNumber',
	},
	{
		label    : 'Sage ID',
		valueKey : 'sageId',
	},
	{
		label           : 'Company Type',
		valueKey        : 'companyType',
		defaultValueKey : '-',
	},
	{
		label           : 'Credit Days',
		valueKey        : 'creditDays',
		defaultValueKey : '0',
	},
];

export const IRN_CANCEL_OPTIONS = [
	{
		label : 'Duplicate',
		name  : 'Duplicate',
		value : '1',
	},
	{
		label : 'Data Entry Mistake',
		name  : 'Data Entry Mistake',
		value : '2',
	},
	{
		label : 'Order Cancelled',
		name  : 'Order Cancelled',
		value : '3',
	},
	{
		label : 'Other',
		name  : 'Other',
		value : '4',
	},
];

export const StatsKeyMapping = [
	{
		label     : 'NOT DUE',
		valueKey  : 'notDue',
		textColor : '#cb6464',
	},
	{
		label     : 'Today',
		valueKey  : 'today',
		textColor : '#cb6464',
	},
	{
		label     : '1-30 DAYS',
		valueKey  : 'thirty',
		textColor : '#cb6464',
	},
	{
		label     : '31-60 DAYS',
		valueKey  : 'sixty',
		textColor : '#cb6464',
	},
	{
		label     : '61-90 DAYS',
		valueKey  : 'ninety',
		textColor : '#cb6464',
	},
	{
		label     : '91-180 DAYS',
		valueKey  : 'oneEighty',
		textColor : '#cb6464',
	},
	{
		label     : '180-365 DAYS',
		valueKey  : 'threeSixtyFive',
		textColor : '#cb6464',
	},
	{
		label     : '365+ DAYS',
		valueKey  : 'threeSixtyFivePlus',
		textColor : '#cb6464',
	},
];

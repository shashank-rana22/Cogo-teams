export const companyType = [
	{
		label : 'Private Limited',
		value : 'private_limited',
		name  : 'private_limited',
	},
	{
		label : 'Public Limited',
		value : 'public_limited',
		name  : 'public_limited',
	},
	{
		label : 'Limited Liability Partnership',
		value : 'limited_liability_partnership',
		name  : 'limited_liability_partnership',
	},
	{
		label : 'Partnership',
		value : 'partnership',
		name  : 'partnership',
	},
	{
		label : 'Proprietorship',
		value : 'proprietorship',
		name  : 'proprietorship',
	},
	{
		label : 'Other',
		value : 'other',
		name  : 'other',
	},
];

export const DUE_IN = [
	{
		label : 'Not Due',
		value : 'amount_not_due',
		name  : 'amount_not_due',
	},
	{
		label : '1-30 Days',
		value : 'amount_1_30',
		name  : 'amount_1_30',
	},
	{
		label : '31-60 Days',
		value : 'amount_31_60',
		name  : 'amount_31_60',
	},
	{
		label : '61-90 Days',
		value : 'amount_61_90',
		name  : 'amount_61_90',
	},
	{
		label : '91-180 Days',
		value : 'amount_91_180',
		name  : 'amount_91_180',
	},
	{
		label : '181-365 Days',
		value : 'amount_181_365',
		name  : 'amount_181_365',
	},
	{
		label : '365+ Days',
		value : 'amount_365',
		name  : 'amount_365',
	}];

export const SALES_AGENT = [
	{
		label : 'Total Outstanding Amount',
		value : 'total_outstanding_amount',
		name  : 'total_outstanding_amount',
	},
	{
		label : 'Open Invoice Amount',
		value : 'open_invoice_amount',
		name  : 'open_invoice_amount',
	},
	{
		label : 'On Account Amount',
		value : 'on_account_amount',
		name  : 'on_account_amount',
	},
];

export const SEARCH_OPTIONS = [
	{
		label : 'Trade Party Serial Id',
		value : 'tradePartySerialId',
		name  : 'tradePartySerialId',
	},
	{
		label : 'Sage ID',
		value : 'sageId',
		name  : 'sageId',
	},
	{
		label : 'Serial Id',
		value : 'organizationSerialId',
		name  : 'organizationSerialId',
	},
	{
		label : 'Business Name/Pan Number',
		value : 'q',
		name  : 'q',
	},
];

export const SORTBY_OPTION = [
	{
		label : 'Not Due',
		value : 'notDueLedgerAmount',
		name  : 'notDueLedgerAmount',
	},
	{
		label : 'Today',
		value : 'todayLedgerAmount',
		name  : 'todayLedgerAmount',
	},
	{
		label : '1-30 Days',
		value : 'thirtyLedgerAmount',
		name  : 'thirtyLedgerAmount',
	},
	{
		label : '31-60 Days',
		value : 'sixtyLedgerAmount',
		name  : 'sixtyLedgerAmount',
	},
	{
		label : '61-90 Days',
		value : 'ninetyLedgerAmount',
		name  : 'ninetyLedgerAmount',
	},
	{
		label : '91-180 Days',
		value : 'oneEightyLedgerAmount',
		name  : 'oneEightyLedgerAmount',
	},
	{
		label : '181-365 Days',
		value : 'threeSixtyFiveLedgerAmount',
		name  : 'threeSixtyFiveLedgerAmount',
	},
	{
		label : '365+ Days',
		value : 'threeSixtyFivePlusLedgerAmount',
		name  : 'threeSixtyFivePlusLedgerAmount',
	},
	{
		label : 'Total Outstanding Amount',
		value : 'totalOutstandingLedgerAmount',
		name  : 'totalOutstandingLedgerAmount',
	},
	{
		label : 'Credit Note',
		value : 'creditNoteLedgerAmount',
		name  : 'creditNoteLedgerAmount',
	},
	{
		label : 'Debit Note',
		value : 'debitNoteLedgerAmount',
		name  : 'debitNoteLedgerAmount',
	},
	{
		label : 'On Account Amount',
		value : 'onAccountPaymentLedgerAmount',
		name  : 'onAccountPaymentLedgerAmount',
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

export const UTILIZATION_STATUS = [
	{ label: 'UTILIZED', value: 'UTILIZED' },
	{ label: 'UNUTILIZED', value: 'UNUTILIZED' },
	{ label: 'PARTIALLY UTILIZED', value: 'PARTIAL_UTILIZED' },
];

export const ACCOUNT_TYPE = [
	{ label: 'All', value: 'All' },
	{ label: 'On Account Payment', value: 'REC' },
	{ label: 'Credit Note', value: 'PCN' },
	{ label: 'Invoice', value: 'SINV' },
];

export const ENTITY_TYPE = [

	{ label: '501 Cogoport Vietnam', value: '501' },
	{ label: '401 Cogo Universe Pte. Ltd', value: '401' },
	{ label: '301 Cogoport Private Limited', value: '301' },
	{ label: '201 Cogoport Netherlands', value: '201' },
	{ label: '101 Cogo Freight PVT Limited', value: '101' },
];

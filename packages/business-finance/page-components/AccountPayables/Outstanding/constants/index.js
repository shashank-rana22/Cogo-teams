import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

export const getSearchOptionsLabels = (entityCode) => [
	{
		label : 'Trade Party Serial Id',
		value : 'tradePartySerialId',
		name  : 'tradePartySerialId',
	},
	{
		label: ENTITY_FEATURE_MAPPING[entityCode].labels
			.search_options_label_sage,
		value : 'sageId',
		name  : 'sageId',
	},
	{
		label : 'Serial Id',
		value : 'organizationSerialId',
		name  : 'organizationSerialId',
	},
	{
		label: ENTITY_FEATURE_MAPPING[entityCode].labels
			.search_options_label_pan,
		value : 'q',
		name  : 'q',
	},
];

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
		value : 'openInvoiceNotDueLedgerAmount',
		name  : 'openInvoiceNotDueLedgerAmount',
	},
	{
		label : '1-30 Days',
		value : 'openInvoiceThirtyLedgerAmount',
		name  : 'openInvoiceThirtyLedgerAmount',
	},
	{
		label : '31-45 Days',
		value : 'openInvoiceFortyFiveLedgerAmount',
		name  : 'openInvoiceFortyFiveLedgerAmount',
	},
	{
		label : '31-60 Days',
		value : 'openInvoiceSixtyLedgerAmount',
		name  : 'openInvoiceSixtyLedgerAmount',
	},
	{
		label : '61-90 Days',
		value : 'openInvoiceNinetyLedgerAmount',
		name  : 'openInvoiceNinetyLedgerAmount',
	},
	{
		label : '91-180 Days',
		value : 'openInvoiceOneEightyLedgerAmount',
		name  : 'openInvoiceOneEightyLedgerAmount',
	},
	{
		label : '181+ Days',
		value : 'openInvoiceOneEightyPlusLedgerAmount',
		name  : 'openInvoiceOneEightyPlusLedgerAmount',
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
		label : 'On Account Amount',
		value : 'onAccountPaymentLedgerAmount',
		name  : 'onAccountPaymentLedgerAmount',
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
		valueKey  : 'invoiceNotDueAmount',
		countKey  : 'invoiceNotDueCount',
		textColor : '#cb6464',
	},
	{
		label     : 'TODAY',
		valueKey  : 'invoiceTodayAmount',
		countKey  : 'invoiceTodayCount',
		textColor : '#cb6464',
	},
	{
		label     : '0-30 DAYS',
		valueKey  : 'invoiceThirtyAmount',
		countKey  : 'invoiceThirtyCount',
		textColor : '#cb6464',
	},
	{
		label     : '30-60 DAYS',
		valueKey  : 'invoiceSixtyAmount',
		countKey  : 'invoiceSixtyCount',
		textColor : '#cb6464',
	},
	{
		label     : '61-90 DAYS',
		valueKey  : 'invoiceNinetyAmount',
		countKey  : 'invoiceNinetyCount',
		textColor : '#cb6464',
	},
	{
		label     : '91-180 DAYS',
		valueKey  : 'invoiceOneEightyAmount',
		countKey  : 'invoiceOneEightyCount',
		textColor : '#cb6464',
	},
	{
		label     : '185-365 DAYS',
		valueKey  : 'invoiceThreeSixtyFiveAmount',
		countKey  : 'invoiceThreeSixtyFiveCount',
		textColor : '#cb6464',
	},
	{
		label     : '365+ DAYS',
		valueKey  : 'invoiceThreeSixtyFivePlusAmount',
		countKey  : 'invoiceThreeSixtyFivePlusCount',
		textColor : '#cb6464',
	},
];

export const StatsKeyMappingPayment = [
	{
		label     : 'NOT DUE',
		valueKey  : 'onAccountNotDueAmount',
		countKey  : 'onAccountNotDueCount',
		textColor : '#cb6464',
	},
	{
		label     : 'TODAY',
		valueKey  : 'onAccountTodayAmount',
		countKey  : 'onAccountTodayCount',
		textColor : '#cb6464',
	},
	{
		label     : '0-30 DAYS',
		valueKey  : 'onAccountThirtyAmount',
		countKey  : 'onAccountThirtyCount',
		textColor : '#cb6464',
	},
	{
		label     : '30-60 DAYS',
		valueKey  : 'onAccountSixtyAmount',
		countKey  : 'onAccountSixtyCount',
		textColor : '#cb6464',
	},
	{
		label     : '61-90 DAYS',
		valueKey  : 'onAccountNinetyAmount',
		countKey  : 'onAccountNinetyCount',
		textColor : '#cb6464',
	},
	{
		label     : '91-180 DAYS',
		valueKey  : 'onAccountOneEightyAmount',
		countKey  : 'onAccountOneEightyCount',
		textColor : '#cb6464',
	},
	{
		label     : '185-365 DAYS',
		valueKey  : 'onAccountThreeSixtyFiveAmount',
		countKey  : 'onAccountThreeSixtyFiveCount',
		textColor : '#cb6464',
	},
	{
		label     : '365+ DAYS',
		valueKey  : 'onAccountThreeSixtyFivePlusAmount',
		countKey  : 'onAccountThreeSixtyFivePlusCount',
		textColor : '#cb6464',
	},
];

export const StatsKeyMappingOutstanding = [
	{
		label     : 'NOT DUE',
		valueKey  : 'notDueOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : 'TODAY',
		valueKey  : 'todayOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '0-30 DAYS',
		valueKey  : 'thirtyOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '30-60 DAYS',
		valueKey  : 'sixtyOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '61-90 DAYS',
		valueKey  : 'ninetyOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '91-180 DAYS',
		valueKey  : 'oneEightyOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '185-365 DAYS',
		valueKey  : 'threeSixtyFiveOutstanding',
		textColor : '#cb6464',
	},
	{
		label     : '365+ DAYS',
		valueKey  : 'threeSixtyFivePlusOutstanding',
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

export const INVOICE_STATUS = {
	Unpaid               : '#FEF1DF',
	Unutilized           : '#FEF1DF',
	Utilized             : '#CDF7D4',
	'Partially Paid'     : '#D9EAFD',
	Paid                 : '#CDF7D4',
	'Knocked Off'        : '#CDF7D4',
	'Partially Utilized' : '#D9EAFD',
};

export const SERVICE_PROVIDER = [
	{ value: 'All', label: 'All' },
	{ value: 'ENTERPRISE', label: 'ES' },
	{ value: 'IE', label: 'IE' },
	{ value: 'CP', label: 'CP' },
	{ value: 'OTHERS', label: 'OTHERS' },
];

export const SHIPMENT_TYPE_OPTIONS = [
	{ value: 'FCL_FREIGHT', label: 'FCL' },
	{ value: 'LCL_FREIGHT', label: 'LCL' },
	{ value: 'AIR_FREIGHT', label: 'AIR' },
	{ value: 'TRAILER_FREIGHT', label: 'Container Transportation' },
	{ value: 'FTL_FREIGHT', label: 'FTL' },
	{ value: 'LTL_FREIGHT', label: 'LTL' },
	{ value: 'HAULAGE_FREIGHT', label: 'Rail Haulage' },
	{ value: 'FCL_CUSTOMS', label: 'FCL Customs' },
	{ value: 'LCL_CUSTOMS', label: 'LCL Customs' },
	{ value: 'AIR_CUSTOMS', label: 'AIR Customs' },
];

export const SALES_FUNNEL_OPTIONS = [
	{ value: 'JAN', label: 'January' },
	{ value: 'FEB', label: 'February' },
	{ value: 'MAR', label: 'March' },
	{ value: 'APR', label: 'April' },
	{ value: 'MAY', label: 'May' },
	{ value: 'JUN', label: 'June' },
	{ value: 'JUL', label: 'July' },
	{ value: 'AUG', label: 'August' },
	{ value: 'SEP', label: 'September' },
	{ value: 'OCT', label: 'October' },
	{ value: 'NOV', label: 'November' },
	{ value: 'DEC', label: 'December' },
];

export const SERVICE_TYPE = [
	{ value: 'fcl_freight', label: 'FCL', name: 'fcl_freight' },
	{ value: 'lcl_freight', label: 'LCL', name: 'fcl_freight' },
	{ value: 'air_freight', label: 'AIR', name: 'fcl_freight' },
	{
		value : 'trailer_freight',
		label : 'Container Transportation',
		name  : 'fcl_freight',
	},
	{ value: 'ftl_freight', label: 'FTL', name: 'fcl_freight' },
	{ value: 'ltl_freight', label: 'LTL', name: 'fcl_freight' },
	{ value: 'haulage_freight', label: 'Rail Haulage', name: 'fcl_freight' },
	{ value: 'fcl_customs', label: 'FCL Customs', name: 'fcl_freight' },
	{ value: 'lcl_customs', label: 'LCL Customs', name: 'fcl_freight' },
	{ value: 'air_customs', label: 'AIR Customs', name: 'fcl_freight' },
	{
		value : 'fcl_freight_local',
		label : 'FCL Freight Local',
		name  : 'fcl_freight',
	},
	{
		value : 'rail_domestic_freight',
		label : 'Rail Domestic',
		name  : 'fcl_freight',
	},
];

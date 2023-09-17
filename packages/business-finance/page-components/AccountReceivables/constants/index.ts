import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

export const getTaxLabels = (entityCode) => [
	{
		label    : ENTITY_FEATURE_MAPPING[entityCode].labels.tax_label,
		valueKey : 'registrationNumber',
	},
	{
		label    : ENTITY_FEATURE_MAPPING[entityCode].labels.sage_label,
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
export const getSearchOptionsLabels = (entityCode) => [
	{
		label : 'Trade Party Serial Id',
		value : 'tradePartySerialId',
		name  : 'tradePartySerialId',
	},
	{
		label : ENTITY_FEATURE_MAPPING[entityCode].labels.search_options_label_sage,
		value : 'sageId',
		name  : 'sageId',
	},
	{
		label : 'Serial Id',
		value : 'organizationSerialId',
		name  : 'organizationSerialId',
	},
	{
		label : ENTITY_FEATURE_MAPPING[entityCode].labels.search_options_label_pan,
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
	{
		label : 'Call Priority',
		value : 'callPriority',
		name  : 'callPriority',
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
		label     : '0-30 DAYS',
		valueKey  : 'thirty',
		textColor : '#cb6464',
	},
	{
		label     : '31-60 DAYS',
		valueKey  : 'fortyFive',
		textColor : '#cb6464',
	},
	{
		label     : '61-90 DAYS',
		valueKey  : 'sixty',
		textColor : '#cb6464',
	},
	{
		label     : '91-180 DAYS',
		valueKey  : 'ninety',
		textColor : '#cb6464',
	},
	{
		label     : '181-365 DAYS',
		valueKey  : 'oneEighty',
		textColor : '#cb6464',
	},
	{
		label     : '365+ DAYS',
		valueKey  : 'oneEightyPlus',
		textColor : '#cb6464',
	},
];

export const StatsKeyMappingPayment = [
	{
		label     : 'NOT DUE',
		valueKey  : 'notDue',
		textColor : '#cb6464',
	},
	{
		label     : '0-30 DAYS',
		valueKey  : 'thirty',
		textColor : '#cb6464',
	},
	{
		label     : '31-45 DAYS',
		valueKey  : 'fortyFive',
		textColor : '#cb6464',
	},
	{
		label     : '46-60 DAYS',
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
		label     : '180+ DAYS',
		valueKey  : 'oneEightyPlus',
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

export const getSalesFunnelOptions = (t) => [
	{ value: 'JAN', label: t('jan_month') },
	{ value: 'FEB', label: t('feb_month') },
	{ value: 'MAR', label: t('mar_month') },
	{ value: 'APR', label: t('apr_month') },
	{ value: 'MAY', label: t('may_month') },
	{ value: 'JUN', label: t('jun_month') },
	{ value: 'JUL', label: t('jul_month') },
	{ value: 'AUG', label: t('aug_month') },
	{ value: 'SEP', label: t('sep_month') },
	{ value: 'OCT', label: t('oct_month') },
	{ value: 'NOV', label: t('nov_month') },
	{ value: 'DEC', label: t('dec_month') },

];

export const SERVICE_TYPE = [
	{ value: 'fcl_freight', label: 'FCL', name: 'fcl_freight' },
	{ value: 'lcl_freight', label: 'LCL', name: 'fcl_freight' },
	{ value: 'air_freight', label: 'AIR', name: 'fcl_freight' },
	{ value: 'trailer_freight', label: 'Container Transportation', name: 'fcl_freight' },
	{ value: 'ftl_freight', label: 'FTL', name: 'fcl_freight' },
	{ value: 'ltl_freight', label: 'LTL', name: 'fcl_freight' },
	{ value: 'haulage_freight', label: 'Rail Haulage', name: 'fcl_freight' },
	{ value: 'fcl_customs', label: 'FCL Customs', name: 'fcl_freight' },
	{ value: 'lcl_customs', label: 'LCL Customs', name: 'fcl_freight' },
	{ value: 'air_customs', label: 'AIR Customs', name: 'fcl_freight' },
	{ value: 'fcl_freight_local', label: 'FCL Freight Local', name: 'fcl_freight' },
	{ value: 'rail_domestic_freight', label: 'Rail Domestic', name: 'fcl_freight' },
];

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const PAYMENT_STATUS = [
	{ label: 'Paid', value: 'paid' },
	{ label: 'Unpaid', value: 'unpaid' },
	{ label: 'Partially Paid', value: 'partial_paid' },
];

export const SHIPMENT_TYPE = [
	{ value: 'fcl_freight', label: 'FCL' },
	{ value: 'lcl_freight', label: 'LCL' },
	{ value: 'air_freight', label: 'AIR' },
	{ value: 'trailer_freight', label: 'Container Transportation' },
	{ value: 'ftl_freight', label: 'FTL' },
	{ value: 'ltl_freight', label: 'LTL' },
	{ value: 'haulage_freight', label: 'Rail Haulage' },
	{ value: 'fcl_customs', label: 'FCL Customs' },
	{ value: 'lcl_customs', label: 'LCL Customs' },
	{ value: 'air_customs', label: 'AIR Customs' },
	{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
	{ value: 'rail_domestic_freight', label: 'Rail Domestic' },
];

export const CURRENCY = Object.keys(GLOBAL_CONSTANTS.currency_code)?.map((currency) => ({
	label : currency,
	value : GLOBAL_CONSTANTS.currency_code[currency],
}));

export const INVOICE_TYPE = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

export const STATUS_MAPPING = {
	UNPAID           : '#FEF1DF',
	'PARTIALLY PAID' : '#D9EAFD',
	PAID             : '#CDF7D4',
};

export const INVOICE_STATUS_MAPPING = {
	DRAFT            : '#fcedbf',
	POSTED           : '#a1f0ae',
	FINANCE_ACCEPTED : '#CDF7D4',
	CONSOLIDATED     : '#D9EAFD',
	IRN_GENERATED    : '#b8debe',
	IRN_FAILED       : '#F89880',
	FAILED           : '#f9b498',
	IRN_CANCELLED    : '#fbc5b0',
	FINANCE_REJECTED : '#f9ac98',
};

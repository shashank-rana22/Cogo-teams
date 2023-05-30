import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const entityDetails = GLOBAL_CONSTANTS.cogoport_entities;

export const ENTITY_OPTIONS = Object.keys(entityDetails)?.map((entity) => ({
	label : `${entity} ${entityDetails[entity]?.name}`,
	value : entity,
}));

export const MIGRATE_STATUS = [
	{ label: 'True', value: true },
	{ label: 'False', value: false },
];

export const INVOICE_STATUSES = [
	{ label: 'Draft', value: 'DRAFT' },
	{ label: 'Finance Rejected', value: 'FINANCE_REJECTED' },
	{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
	{ label: 'Irn Generated', value: 'IRN_GENERATED' },
	{ label: 'Irn Failed', value: 'IRN_FAILED' },
	{ label: 'Irn Cancelled', value: 'IRN_CANCELLED' },
	{ label: 'Posted to Sage', value: 'POSTED' },
	{ label: 'Post to Sage Failed', value: 'FAILED' },
	{ label: 'Requested', value: 'REQUESTED' },
];

export const VN_ENTITIES = [{ label: '501 Cogoport Vietnam', value: '501' }];

export const VN_INVOICE_STATUSES = [
	{ label: 'Draft', value: 'DRAFT' },
	{ label: 'Finance Rejected', value: 'FINANCE_REJECTED' },
	{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
	{ label: 'E-INVOICE Generated', value: 'IRN_GENERATED' },
	{ label: 'Requested', value: 'REQUESTED' },
];

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

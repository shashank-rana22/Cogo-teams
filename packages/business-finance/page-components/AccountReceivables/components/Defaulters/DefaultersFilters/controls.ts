import {
	ENTITY_OPTIONS, MIGRATE_STATUS,
	INVOICE_STATUSES, VN_ENTITIES, VN_INVOICE_STATUSES, PAYMENT_STATUS, SHIPMENT_TYPE, CURRENCY,
} from './constants';

export const defaultersControls = () => ({
	IN: [
		{
			name        : 'migrated',
			type        : 'select',
			placeholder : 'Migration Status',
			span        : 3,
			options     : MIGRATE_STATUS,
			size        : 'sm',
			style       : { width: '172px' },
			selectWidth : '172px',
		},
		{
			name        : 'cogoEntity',
			type        : 'select',
			placeholder : 'Entity',
			options     : ENTITY_OPTIONS,
			span        : 1,
			size        : 'sm',
			style       : { width: '128px' },
			selectWidth : '128px',
		},
		{
			name        : 'invoiceStatus',
			type        : 'select',
			placeholder : 'Invoice status',
			span        : 3,
			options     : INVOICE_STATUSES,
			size        : 'sm',
			style       : { width: '154px' },
			selectWidth : '154px',
		},
	],
	VN: [
		{
			name        : 'cogoEntity',
			type        : 'select',
			placeholder : 'Entity',
			theme       : 'admin',
			className   : 'primary md',
			options     : VN_ENTITIES,
			span        : 1,
			size        : 'sm',
		},
		{
			name        : 'invoiceStatus',
			type        : 'select',
			placeholder : 'Invoice status',
			span        : 1,
			options     : VN_INVOICE_STATUSES,
			theme       : 'admin',
			className   : 'primary md',
			size        : 'sm',
		},
	],

	// COMMON FILTERS

	// {
	// 	name        : 'status',
	// 	type        : 'select',
	// 	placeholder : 'Payment Status',
	// 	span        : 0.5,
	// 	options     : PAYMENT_STATUS,
	// 	theme       : 'admin',
	// 	className   : 'primary md',
	// 	size        : 'sm',
	// },
	// {
	// 	name        : 'services',
	// 	type        : 'select',
	// 	theme       : 'admin',
	// 	className   : 'primary md',
	// 	multiple    : true,
	// 	placeholder : 'Shipment Type',
	// 	span        : 0.5,
	// 	options     : SHIPMENT_TYPE,
	// 	size        : 'sm',
	// },
	// {
	// 	name                  : 'invoiceDate',
	// 	type                  : 'singleDateRange',
	// 	placeholder           : 'Invoice Date',
	// 	span                  : 0.5,
	// 	isPreviousDaysAllowed : true,
	// 	size                  : 'sm',
	// },
	// {
	// 	name                  : 'dueDate',
	// 	type                  : 'singleDateRange',
	// 	placeholder           : 'Due Date',
	// 	span                  : 0.5,
	// 	isPreviousDaysAllowed : true,
	// 	size                  : 'sm',
	// },
	// {
	// 	name        : 'currency',
	// 	type        : 'select',
	// 	theme       : 'admin',
	// 	className   : 'primary md',
	// 	placeholder : 'Currency',
	// 	span        : 0.5,
	// 	options     : CURRENCY,
	// 	size        : 'sm',
	// },
});

export default defaultersControls;

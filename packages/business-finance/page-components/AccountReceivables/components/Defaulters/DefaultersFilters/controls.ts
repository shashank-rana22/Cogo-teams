import {
	ENTITY_OPTIONS, MIGRATE_STATUS,
	INVOICE_STATUSES, VN_ENTITIES, VN_INVOICE_STATUSES, PAYMENT_STATUS, SHIPMENT_TYPE, CURRENCY,
} from './constants';

export const defaultersControls = ({ globalFilters }) => {
	const { migrated, cogoEntity, invoiceStatus } = globalFilters || {};
	return {
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
				value       : migrated,
				isClearable : true,
			},
			{
				name        : 'cogoEntity',
				value       : cogoEntity,
				type        : 'select',
				placeholder : 'Entity',
				options     : ENTITY_OPTIONS,
				span        : 1,
				size        : 'sm',
				style       : { width: '128px' },
				selectWidth : '128px',
				isClearable : true,
			},
			{
				name        : 'invoiceStatus',
				value       : invoiceStatus,
				type        : 'select',
				placeholder : 'Invoice status',
				span        : 3,
				options     : INVOICE_STATUSES,
				size        : 'sm',
				style       : { width: '154px' },
				selectWidth : '154px',
				isClearable : true,
			},
		],
		VN: [
			{
				name        : 'cogoEntity',
				value       : cogoEntity,
				type        : 'select',
				placeholder : 'Entity',
				theme       : 'admin',
				className   : 'primary md',
				options     : VN_ENTITIES,
				span        : 1,
				size        : 'sm',
				isClearable : true,
			},
			{
				name        : 'invoiceStatus',
				value       : invoiceStatus,
				type        : 'select',
				placeholder : 'Invoice status',
				span        : 1,
				options     : VN_INVOICE_STATUSES,
				theme       : 'admin',
				className   : 'primary md',
				size        : 'sm',
				isClearable : true,
			},
		],

	};
};

import getGeoConstants, { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import {
	MIGRATE_STATUS,
	INVOICE_STATUSES, VN_INVOICE_STATUSES,
} from './constants';

export const defaultersControls = ({ globalFilters, partnerIds }) => {
	const geo = getGeoConstants();
	const ENTITY_OPTIONS = geo.options.entities;

	const { migrated, cogoEntity, invoiceStatus } = globalFilters || {};

	const isMigratedAllowed = geo.navigations.account_receivables.defaulters.migration_status.show_filter;

	console.log('data->', { isMigratedAllowed, ENTITY_OPTIONS });

	return [{
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
	}];
	// }
	// return [
	// 	{
	// 		name        : 'cogoEntity',
	// 		value       : cogoEntity,
	// 		type        : 'select',
	// 		placeholder : 'Entity',
	// 		theme       : 'admin',
	// 		className   : 'primary md',
	// 		options     : VN_ENTITIES_OPTIONS,
	// 		span        : 1,
	// 		size        : 'sm',
	// 		isClearable : true,
	// 	},
	// 	{
	// 		name        : 'invoiceStatus',
	// 		value       : invoiceStatus,
	// 		type        : 'select',
	// 		placeholder : 'Invoice status',
	// 		span        : 1,
	// 		options     : VN_INVOICE_STATUSES,
	// 		theme       : 'admin',
	// 		className   : 'primary md',
	// 		size        : 'sm',
	// 		isClearable : true,
	// 	},
	// ];
};

import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import {
	ENTITY_OPTIONS, MIGRATE_STATUS,
	INVOICE_STATUSES, VN_INVOICE_STATUSES,
} from './constants';

export const defaultersControls = ({ globalFilters, partnerIds }) => {
	const { migrated, cogoEntity, invoiceStatus } = globalFilters || {};

	const countryCode = Object.keys(GLOBAL_CONSTANTS.country_entity_ids).find(
		(key) => GLOBAL_CONSTANTS.country_entity_ids[key] === partnerIds,
	);

	const isMigratedAllowed = GLOBAL_CONSTANTS.country_specific_data[countryCode]?.navigation
		.admin.account_receivables.defaulters.migration_status.show_filter;

	const countryWiseData = getCountryConstants({ country_id: GLOBAL_CONSTANTS.country_entity_ids.VN });
	console.log('countryWiseData->', countryWiseData);

	const VN_ENTITIES_OPTIONS = countryWiseData?.options?.vn_entities;

	if (!isMigratedAllowed) {
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
	}
	return [
		{
			name        : 'cogoEntity',
			value       : cogoEntity,
			type        : 'select',
			placeholder : 'Entity',
			theme       : 'admin',
			className   : 'primary md',
			options     : VN_ENTITIES_OPTIONS,
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
	];
};

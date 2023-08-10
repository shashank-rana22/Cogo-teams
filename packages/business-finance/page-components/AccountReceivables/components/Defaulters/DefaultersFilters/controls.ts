import getGeoConstants from '@cogoport/globalization/constants/geo';

interface Options {
	label:string,
	value:string
}

export const defaultersControls = ({ globalFilters }) => {
	const geo = getGeoConstants();

	const MIGRATE_STATUS:Options[] | any = geo.options.migration_status;
	const INVOICE_STATUSES:Options[] | any = geo.options.invoice_status;

	const { migrated, invoiceStatus } = globalFilters || {};

	const isMigratedAllowed = geo.navigations.account_receivables.defaulters.migration_status.show_filter;

	const basicControls = [
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

	if (isMigratedAllowed) {
		return [...basicControls,
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
		];
	}

	return [...basicControls];
};

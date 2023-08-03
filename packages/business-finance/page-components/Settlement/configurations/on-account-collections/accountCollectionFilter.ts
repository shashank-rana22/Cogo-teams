export const amountCollectionFilters = ({ accMode }) => [
	{
		name        : 'accMode',
		type        : 'select',
		placeholder : 'Account Mode',
		size        : 'sm',
		value       : accMode,
		options     : [
			{ label: 'AR', value: 'AR' },
			{ label: 'AP', value: 'AP' },
		],
		selectWidth: '150px',
	},
	{
		name                  : 'date',
		type                  : 'singleDateRange',
		placeholder           : 'Date',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		span                  : 3,
	},
];

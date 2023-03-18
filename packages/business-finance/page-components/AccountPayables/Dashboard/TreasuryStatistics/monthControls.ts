export const monthControls = [
	{
		name           : 'months',
		type           : 'select',
		size           : 'md',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : true,
		options        : [
			{ value: 'today', label: 'Today' },
			{ value: 'thisMonth', label: 'This Month' },
			{ value: 'lastThreeMonth', label: 'Last 3 Months' },
			{ value: 'lastSixMonth', label: 'Last 6 Months' },
			{ value: 'lastTwelveMonths', label: 'Last 12 Months' },
		],

	},
];

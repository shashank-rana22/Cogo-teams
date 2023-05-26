const defaultersCustomerFilters = () => [
	{
		label       : 'Zone',
		name        : 'zone',
		type        : 'select',
		placeholder : 'Zone',
		span        : 2,
		options     : [
			{ label: 'East', value: 'EAST' },
			{ label: 'West', value: 'WEST' },
			{ label: 'North', value: 'NORTH' },
			{ label: 'South', value: 'SOUTH' },
		],

	},
];

export default defaultersCustomerFilters;

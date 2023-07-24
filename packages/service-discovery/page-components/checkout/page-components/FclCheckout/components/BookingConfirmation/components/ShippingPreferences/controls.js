const controls = [
	{
		label       : 'Alternate Line',
		name        : 'alternate_line',
		type        : 'select',
		placeholder : 'Select Line',
		styles      : { flexBasis: '24%', paddingRight: '40px' },
	},
	{
		label       : 'Select Date Range',
		name        : 'alternate_line',
		type        : 'single-date-picker',
		placeholder : 'Sailing Week',
		styles      : { flexBasis: '24%', padding: '0px 40px' },
	},
	{
		label       : 'Price Range (Basic Freight)',
		name        : 'alternate_line',
		type        : 'price-range',
		placeholder : 'Sailing Week',
		styles      : { flexBasis: '28%' },
		subControls : [
			{
				name        : 'from',
				type        : 'number',
				placeholder : 'From',
				styles      : { flexBasis: '50%' },
			},
			{
				name        : 'to',
				type        : 'number',
				placeholder : 'To',
				styles      : { flexBasis: '50%' },
			},
		],
	},
	{
		label       : 'Specific Vessel',
		name        : 'specific_vessel',
		type        : 'text',
		placeholder : 'Type',
		styles      : { flexBasis: '24%', paddingLeft: '80px' },
	},
];

export default controls;

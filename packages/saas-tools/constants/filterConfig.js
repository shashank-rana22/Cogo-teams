export const FILTERCONFIG = [
	{
		name        : 'shipping_line_id',
		label       : 'Shpping Line',
		type        : 'asyncSelect',
		placeholder : 'Enter Shpping Line',
		asyncKey    : 'shipping_lines',
		labelKey    : 'business_name',
		valueKey    : 'id',
		style       : { width: '300px' },
		multiple    : true,
	},

	{
		name        : 'source',
		label       : 'Source',
		type        : 'select',
		placeholder : 'Enter Source',
		options     : [
			{ label: 'Tracking Job', value: 'tracking_job' },
			{ label: 'Default', value: 'default' },
		],
		style: { width: '150px' },
	},
	{
		label       : 'Status',
		name        : 'status',
		type        : 'select',
		placeholder : 'Select Status',
		options     : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
			{ label: 'Unmapped', value: 'unmapped' },
		],
		style: { width: '150px' },
	},
];

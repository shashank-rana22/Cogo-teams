export const controls = [
	{
		name        : 'approx',
		label       : 'Approximate By',
		type        : 'select',
		placeholder : 'Choose..',
		span        : 12,
		options     : [
			{ label: 'Ceil', value: 'ceil' },
			{ label: 'Floor', value: 'floor' },
			{ label: 'Round', value: 'round' },
		],
		rules: { required: 'Required' },
	},
];

const controls = [
	{
		name        : 'name',
		label       : 'Mastery Name',
		placeholder : 'Multi Modal Maestro',
		type        : 'text',
		rules       : {
			required: 'Mastery name is required',
		},
		isClearable: true,
	},
	{
		name        : 'badges',
		label       : 'Badges',
		placeholder : 'Select',
		type        : 'multiSelect',
		options     : [
			{ value: 'nautical_ninja', label: 'Nautical Ninja' },
			{ value: 'wings_silver', label: 'Wings of Silver' },
			{ value: 'wings_gold', label: 'Wings of Gold' },
			{ value: 'wings_bronze', label: 'Wings of Bronze' },
		],
		rules: {
			required: 'Select a Badge',
		},
		isClearable : false,
		styles      : {
			width: '200px',
		},
	},
	// ToDo : add a control for the image to be uploaded
];

export default controls;

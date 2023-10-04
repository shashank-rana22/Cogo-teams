const controls = [
	{
		name        : 'field_type',
		displayName : 'Workscope Constraints',
		type        : 'select',
		placeholder : 'workscope',
		options     : [
			{ label: 'Director', value: 'director' },
			{ label: 'VP Supply', value: 'vp_supply' },
		],

		rules: { required: 'Required' },
	},
	{
		name        : 'field_value',
		displayName : 'Number of Contacts',
		type        : 'number',
		placeholder : 'number',
		rules       : { required: 'Required' },
	},
];
export default controls;

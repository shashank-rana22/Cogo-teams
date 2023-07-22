const controls = [
	{
		name    : 'select_users',
		type    : 'radioGroup',
		options : [
			{
				name  : 'default',
				value : 'default',
				label : 'Default Experience Slabs',
			},
			{
				name  : 'custom',
				value : 'custom',
				label : 'Custom Experience Slabs (4 Slabs Maximum)',
			},
		],
		rules: { required: 'This is required' },
	},
];

export default controls;

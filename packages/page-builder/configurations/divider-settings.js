const dividerSettings = [
	{
		type    : 'Style',
		options : [
			{
				label : 'Color',
				key   : 'border-top-color',
				type  : 'color',
			},
			{
				label : 'Width',
				key   : 'border-top-width',
				type  : 'number',
			},
			{
				label   : 'Style',
				key     : 'border-top-style',
				type    : 'select',
				options : [
					{ label: 'None', value: 'none' },
					{ label: 'Solid', value: 'solid' },
					{ label: 'Dotted', value: 'dotted' },
					{ label: 'Dashed', value: 'dashed' },
				],
			},
		],
	},
];

export default dividerSettings;

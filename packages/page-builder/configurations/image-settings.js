const imageSettings = [
	{
		type    : 'Background',
		options : [
			{
				label : 'Color',
				key   : 'background-color',
				type  : 'color',
			},
			{
				label : 'Image',
				key   : 'background-image',
				type  : 'upload',
			},
		],
	},
	{
		type    : 'Margin',
		options : [
			{
				label : 'Top',
				key   : 'margin-top',
				type  : 'number',
			},
			{
				label : 'Left',
				key   : 'margin-left',
				type  : 'number',
			},
			{
				label : 'Bottom',
				key   : 'margin-bottom',
				type  : 'number',
			},
			{
				label : 'Right',
				key   : 'margin-right',
				type  : 'number',
			},
		],
	},
	{
		type    : 'Padding',
		options : [
			{
				label : 'Top',
				key   : 'padding-top',
				type  : 'number',
			},
			{
				label : 'Left',
				key   : 'padding-left',
				type  : 'number',
			},
			{
				label : 'Bottom',
				key   : 'padding-bottom',
				type  : 'number',
			},
			{
				label : 'Right',
				key   : 'padding-right',
				type  : 'number',
			},
		],
	},

	{
		type    : 'Dimensions',
		options : [
			{ label: 'Image Size', key: 'width', type: 'range' },
		],
	},

	{
		type    : 'Border',
		options : [
			{
				label   : 'Border',
				key     : 'border',
				type    : 'select',
				options : [
					{ label: 'none', value: 'none' },
					{ label: 'solid', value: 'solid' },
					{ label: 'dashed', value: 'dashed' },
					{ label: 'dotted', value: 'dotted' },

				],
			},
			{ label: 'Border Width', key: 'borderWidth', type: 'number' },
			{ label: 'Border Color', key: 'borderColor', type: 'color' },
		],
	},
];

export default imageSettings;

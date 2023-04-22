const textSettings = [
	{
		type    : 'Background',
		options : [
			{
				label : 'Color',
				key   : 'background-color',
				type  : 'color',
			},
			{
				label          : 'Image',
				key            : 'background-image',
				defaultOptions : [{ key: 'width', value: '100%' }, { key: 'height', value: '400px' }],
				type           : 'upload',
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
		type    : 'Border',
		options : [
			{
				label : 'Color',
				key   : 'border-color',
				type  : 'color',
			},
			{
				label : 'Width',
				key   : 'border-width',
				type  : 'number',
			},
			{
				label   : 'Style',
				key     : 'border-style',
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

export default textSettings;

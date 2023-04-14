const buttonSettings = [
	{ label: 'Text', key: 'text' },
	{ label: 'Background Color', key: 'backgroundColor', type: 'color' },
	{ label: 'Text Color', key: 'color', type: 'color' },
	{
		label   : 'Border Style',
		key     : 'borderStyle',
		type    : 'select',
		options : ['none', 'solid', 'dashed', 'dotted'],
	},
	{
		label : 'Border Width',
		key   : 'borderWidth',
		type  : 'number',
	},
	{
		label : 'Border Color',
		key   : 'borderColor',
		type  : 'color',
	},
	{
		label : 'Border Radius',
		key   : 'borderRadius',
		type  : 'number',
	},
	{
		label   : 'Font Weight',
		key     : 'fontWeight',
		type    : 'select',
		options : ['normal', 'bold'],
	},
	{
		label : 'Font Size',
		key   : 'fontSize',
		type  : 'number',
	},
	{
		label   : 'Text Align',
		key     : 'textAlign',
		type    : 'select',
		options : ['left', 'center', 'right', 'justify'],
	},
	{
		label : 'Padding',
		key   : 'padding',
		type  : 'number',
	},
	{
		label : 'Margin',
		key   : 'margin',
		type  : 'number',
	},
];

export default buttonSettings;

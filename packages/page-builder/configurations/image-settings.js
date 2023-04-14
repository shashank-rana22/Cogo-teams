const imageSettings = [
	{ label: 'Width', key: 'width', type: 'number' },
	{ label: 'Height', key: 'height', type: 'number' },
	{
		label   : 'Border',
		key     : 'border',
		type    : 'select',
		options : ['none', 'solid', 'dashed', 'dotted'],
	},
	{ label: 'Border Width', key: 'borderWidth', type: 'number' },
	{ label: 'Border Color', key: 'borderColor', type: 'color' },
];

export default imageSettings;

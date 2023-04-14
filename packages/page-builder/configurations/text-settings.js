const textSettings = [
	{
		label : 'Background Image',
		key   : 'backgroundImage',
		type  : 'file',
	},

	{ label: 'Text', key: 'text' },
	{ label: 'Font Size', key: 'fontSize', type: 'number' },
	{ label: 'Color', key: 'color', type: 'color' },
	{
		label   : 'Font Weight',
		key     : 'fontWeight',
		type    : 'select',
		options : ['normal', 'bold'],
	},
	{
		label   : 'Text Decoration',
		key     : 'textDecoration',
		type    : 'select',
		options : ['none', 'underline', 'overline', 'line-through'],
	},
	{
		label   : 'Text Align',
		key     : 'textAlign',
		type    : 'select',
		options : ['left', 'center', 'right', 'justify'],
	},
	{ label: 'Letter Spacing', key: 'letterSpacing', type: 'number' },
	{ label: 'Line Height', key: 'lineHeight', type: 'number' },
	{
		label   : 'Font Style',
		key     : 'fontStyle',
		type    : 'select',
		options : ['normal', 'italic', 'oblique'],
	},
	{
		label   : 'Text Transform',
		key     : 'textTransform',
		type    : 'select',
		options : ['none', 'capitalize', 'uppercase', 'lowercase'],
	},
	{
		label   : 'Word Wrap',
		key     : 'wordWrap',
		type    : 'select',
		options : ['normal', 'break-word'],
	},
	{
		label   : 'White Space',
		key     : 'whiteSpace',
		type    : 'select',
		options : ['normal', 'nowrap', 'pre-wrap'],
	},
	{ label: 'Word Spacing', key: 'wordSpacing', type: 'number' },
	{ label: 'Text Indent', key: 'textIndent', type: 'number' },
	{
		label   : 'Vertical Align',
		key     : 'verticalAlign',
		type    : 'select',
		options : ['baseline', 'top', 'middle', 'bottom'],
	},

];

export default textSettings;

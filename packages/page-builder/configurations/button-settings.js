const buttonSettings = [
	{
		type    : 'Background',
		options : [
			{
				label : 'Color',
				key   : 'background-color',
				type  : 'color',
			},
			{
				label : 'Background Image',
				key   : 'background-image',
				type  : 'upload',
			},
		],
	},
	{
		type    : 'Button',
		options : [
			{
				label : 'Background',
				key   : 'background-color',
				type  : 'color',
			},
			{ label: 'Color', key: 'color', type: 'color' },
			{ label: 'Font Size', key: 'fontSize', type: 'number' },
			{
				label   : 'Font Weight',
				key     : 'fontWeight',
				type    : 'select',
				options : [
					{ label: 'Normal', value: 'normal' },
					{ label: 'Bold', value: 'bold' },
				],
			},
			{
				label   : 'Font Style',
				key     : 'fontStyle',
				type    : 'select',
				options : [
					{ label: 'Normal', value: 'normal' },
					{ label: 'Italic', value: 'italic' },
					{ label: 'Oblique', value: 'oblique' },
				],
			},
			{
				label   : 'Text Transform',
				key     : 'textTransform',
				type    : 'select',
				options : [
					{ label: 'None', value: 'none' },
					{ label: 'Capitalize', value: 'capitalize' },
					{ label: 'Uppercase', value: 'uppercase' },
					{ label: 'Lowercase', value: 'lowercase' }],
			},
			{
				label   : 'Text Decoration',
				key     : 'textDecoration',
				type    : 'select',
				options : [
					{ label: 'None', value: 'none' },
					{ label: 'Underline', value: 'underline' },
					{ label: 'Overline', value: 'overline' },
					{ label: 'Line-Through', value: 'line-through' },
				],
			},

		],
	},

	// {
	// 	type    : 'Text',
	// 	options : [
	// 		{ label: 'Font Size', key: 'fontSize', type: 'number' },
	// 		{
	// 			label   : 'Font Style',
	// 			key     : 'fontStyle',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Normal', value: 'normal' },
	// 				{ label: 'Italic', value: 'italic' },
	// 				{ label: 'Oblique', value: 'oblique' },
	// 			],
	// 		},
	// 		{ label: 'Color', key: 'color', type: 'color' },
	// 		{
	// 			label   : 'Font Weight',
	// 			key     : 'fontWeight',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Normal', value: 'normal' },
	// 				{ label: 'Bold', value: 'bold' },
	// 			],
	// 		},
	// 		{
	// 			label   : 'Text Transform',
	// 			key     : 'textTransform',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'None', value: 'none' },
	// 				{ label: 'Capitalize', value: 'capitalize' },
	// 				{ label: 'Uppercase', value: 'uppercase' },
	// 				{ label: 'Lowercase', value: 'lowercase' }],
	// 		},
	// 		{
	// 			label   : 'Text Decoration',
	// 			key     : 'textDecoration',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'None', value: 'none' },
	// 				{ label: 'Underline', value: 'underline' },
	// 				{ label: 'Overline', value: 'overline' },
	// 				{ label: 'Line-Through', value: 'line-through' },
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	type    : 'Align',
	// 	options : [
	// 		{
	// 			label   : 'Text Align',
	// 			key     : 'textAlign',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Left', value: 'left' },
	// 				{ label: 'Center', value: 'center' },
	// 				{ label: 'Right', value: 'right' },
	// 				{ label: 'Justify', value: 'justify' },
	// 			],
	// 		},
	// 		{
	// 			label   : 'Vertical Align',
	// 			key     : 'verticalAlign',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Baseline', value: 'baseline' },
	// 				{ label: 'Top', value: 'top' },
	// 				{ label: 'Middle', value: 'middle' },
	// 				{ label: 'Bottom', value: 'bottom' },
	// 			],
	// 		},
	// 	],
	// },

	// {
	// 	type    : 'Spacing',
	// 	options : [
	// 		{ label: 'Letter Spacing', key: 'letterSpacing', type: 'number' },
	// 		{ label: 'Line Height', key: 'lineHeight', type: 'number' },

	// 		{
	// 			label   : 'Word Wrap',
	// 			key     : 'wordWrap',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Normal', value: 'normal' },
	// 				{ label: 'Break-word', value: 'break-word' },
	// 			],
	// 		},
	// 		{
	// 			label   : 'White Space',
	// 			key     : 'whiteSpace',
	// 			type    : 'select',
	// 			options : [
	// 				{ label: 'Normal', value: 'normal' },
	// 				{ label: 'Nowrap', value: 'nowrap' },
	// 				{ label: 'Pre-wrap', value: 'pre-wrap' }],
	// 		},
	// 		{ label: 'Word Spacing', key: 'wordSpacing', type: 'number' },
	// 		{ label: 'Text Indent', key: 'textIndent', type: 'number' },
	// 	],
	// },
];

export default buttonSettings;

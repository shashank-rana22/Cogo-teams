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
		type    : 'Text',
		options : [
			{ label: 'Font Size', key: 'font-size', type: 'number' },
			{
				label   : 'Font Style',
				key     : 'font-style',
				type    : 'select',
				options : [
					{
						label: 'normal', value: 'normal',
					},
					{
						label: 'italic', value: 'italic',
					},
					{
						label: 'oblique', value: 'oblique',
					},
				],
			},
			{ label: 'Color', key: 'color', type: 'color' },
			{
				label   : 'Font Weight',
				key     : 'font-weight',
				type    : 'select',
				options : [
					{
						label: 'normal', value: 'normal',
					},
					{
						label: 'bold', value: 'bold',
					},

				],
			},
			{
				label   : 'Text Transform',
				key     : 'text-transform',
				type    : 'select',
				options : [
					{
						label: 'none', value: 'none',
					},
					{
						label: 'capitalize', value: 'capitalize',
					},
					{
						label: 'uppercase', value: 'uppercase',
					},
					{
						label: 'lowercase', value: 'lowercase',
					},

				],
			},
			{
				label   : 'Text Decoration',
				key     : 'text-decoration',
				type    : 'select',
				options : [
					{
						label: 'none', value: 'none',
					},
					{
						label: 'underline', value: 'underline',
					},
					{
						label: 'overline', value: 'overline',
					},
					{
						label: 'line-through', value: 'line-through',
					},

				],
			},
		],
	},
	{
		type    : 'Align',
		options : [
			{
				label   : 'Text Align',
				key     : 'text-align',
				type    : 'select',
				options : [
					{
						label: 'left', value: 'left',
					},
					{
						label: 'center', value: 'center',
					},
					{
						label: 'right', value: 'right',
					},
					{
						label: 'justify', value: 'justify',
					},

				],
			},
			{
				label   : 'Vertical Align',
				key     : 'vertical-align',
				type    : 'select',
				options : [
					{
						label: 'baseline', value: 'baseline',
					},
					{
						label: 'top', value: 'top',
					},
					{
						label: 'middle', value: 'middle',
					},
					{
						label: 'bottom', value: 'bottom',
					},

				],
			},
		],
	},
];

export default textSettings;

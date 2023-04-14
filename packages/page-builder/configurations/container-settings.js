const containerSettings = [
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

export default containerSettings;

// const settings = [
// 	{
// 		label : 'Border Color',
// 		key   : 'border-color',
// 		type  : 'color',
// 	},
// 	{
// 		label : 'Border Width',
// 		key   : 'border-width',
// 		type  : 'number',
// 	},
// 	{
// 		label   : 'Border Style',
// 		key     : 'border-style',
// 		type    : 'select',
// 		options : [
// 			{ label: 'None', value: 'none' },
// 			{ label: 'Solid', value: 'solid' },
// 			{ label: 'Dotted', value: 'dotted' },
// 			{ label: 'Dashed', value: 'dashed' },
// 			{ label: 'Double', value: 'double' },
// 			{ label: 'Groove', value: 'groove' },
// 			{ label: 'Ridge', value: 'ridge' },
// 			{ label: 'Inset', value: 'inset' },
// 			{ label: 'Outset', value: 'outset' },
// 		],
// 	},
// 	{
// 		label : 'Box Shadow',
// 		key   : 'box-shadow',
// 		type  : 'text',
// 	},
// 	{
// 		label   : 'Display',
// 		key     : 'display',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Block', value: 'block' },
// 			{ label: 'Inline', value: 'inline' },
// 			{ label: 'Inline Block', value: 'inline-block' },
// 			{ label: 'Flex', value: 'flex' },
// 			{ label: 'Grid', value: 'grid' },
// 			{ label: 'None', value: 'none' },
// 		],
// 	},
// 	{ label: 'Height', key: 'height', type: 'number' },
// 	{ label: 'Width', key: 'width', type: 'number' },
// 	{
// 		label   : 'Flex Direction',
// 		key     : 'flex-direction',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Row', value: 'row' },
// 			{ label: 'Row Reverse', value: 'row-reverse' },
// 			{ label: 'Column', value: 'column' },
// 			{ label: 'Column Reverse', value: 'column-reverse' },
// 		],
// 	},
// 	{ label: 'Flex Grow', key: 'flex-grow', type: 'number' },
// 	{ label: 'Flex Shrink', key: 'flex-shrink', type: 'number' },
// 	{ label: 'Flex Basis', key: 'flex-basis', type: 'number' },
// 	{
// 		label   : 'Align Items',
// 		key     : 'align-items',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Stretch', value: 'stretch' },
// 			{ label: 'Center', value: 'center' },
// 			{ label: 'Flex Start', value: 'flex-start' },
// 			{ label: 'Flex End', value: 'flex-end' },
// 			{ label: 'Baseline', value: 'baseline' },
// 		],
// 	},
// 	{
// 		label   : 'Align Content',
// 		key     : 'align-content',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Stretch', value: 'stretch' },
// 			{ label: 'Center', value: 'center' },
// 			{ label: 'Flex Start', value: 'flex-start' },
// 			{ label: 'Flex End', value: 'flex-end' },
// 			{ label: 'Space Between', value: 'space-between' },
// 			{ label: 'Space Around', value: 'space-around' },
// 		],
// 	},
// 	{
// 		label   : 'Align Self',
// 		key     : 'align-self',
// 		type    : 'select',
// 		options : [
// 			{ value: 'auto', label: 'Auto' },
// 			{ value: 'flex-start', label: 'Flex Start' },
// 			{ value: 'flex-end', label: 'Flex End' },
// 			{ value: 'center', label: 'Center' },
// 			{ value: 'baseline', label: 'Baseline' },
// 			{ value: 'stretch', label: 'Stretch' },
// 		],
// 	},
// 	{
// 		label   : 'Justify Content',
// 		key     : 'justify-content',
// 		type    : 'select',
// 		options : [
// 			{ value: 'flex-start', label: 'Flex Start' },
// 			{ value: 'flex-end', label: 'Flex End' },
// 			{ value: 'center', label: 'center' },
// 			{ value: 'space-between', label: 'Space Between' },
// 			{ value: 'space-around', label: 'Space Around' },
// 			{ value: 'space-evenly', label: 'Space Evenly' },
// 		],
// 	},
// 	{
// 		label : 'Margin',
// 		key   : 'margin',
// 		type  : 'number',
// 	},
// 	{
// 		label : 'Padding',
// 		key   : 'padding',
// 		type  : 'number',
// 	},
// ];

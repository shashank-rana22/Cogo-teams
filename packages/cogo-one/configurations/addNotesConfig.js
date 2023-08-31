const OCEAN_CONTROLS = [
	{
		name               : 'additional',
		controlType        : 'fieldArray',
		noDeleteButtonTill : 1,
		defaultValues      : [
			{
				category : '',
				remarks  : '',
				document : '',
			},
		],
		width    : '100%',
		controls : [
			{
				name        : 'category',
				controlType : 'select',
				placeholder : 'Category',
				width       : '70%',
				options     : [
					{
						label : 'Document',
						value : 'document',
					},
					{
						label : 'Booking',
						value : 'booking',
					},
					{
						label : 'Invoice',
						value : 'invoice',
					},
					{
						label : 'Payment',
						value : 'payment',
					},
					{
						label : 'Others',
						value : 'others',
					},
				],
				rules: {
					required: 'Category is required',
				},
			},
			{
				name        : 'remarks',
				controlType : 'input',
				type        : 'text',
				placeholder : 'Comment',
				width       : '70%',
				rules       : {
					required: 'Comment is required',
				},
			},
			{
				name        : 'document',
				controlType : 'fileUpload',
				type        : 'text',
				width       : '100%',
			},
		],
	},
];

export const MODE_CONTROLS_MAPPING = {
	ocean: OCEAN_CONTROLS,
};

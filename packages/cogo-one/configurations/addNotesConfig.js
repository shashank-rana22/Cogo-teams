const OCEAN_CONTROLS = [
	{
		name               : 'additional',
		controlType        : 'fieldArray',
		noDeleteButtonTill : 1,
		defaultValues:
			{
				category : '',
				remarks  : '',
				document : '',
			},
		width        : '100%',
		customStyles : {
			flexDirection : 'column',
			alignItems    : 'flex-start',
			border        : '1px solid #e0e0e0',
			borderRadius  : '8px',
			padding       : '8px',
		},
		showAddButton : true,
		buttonText    : '+ Add More',
		controls      : [
			{
				name        : 'category',
				controlType : 'select',
				placeholder : 'Category',
				label       : 'Select Category',
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
				customStyles: {
					width: '100%',
				},
				rules: {
					required: 'Category is required',
				},
			},
			{
				name        : 'remarks',
				controlType : 'textarea',

				type        : 'text',
				placeholder : 'Add Comments here...',
				width       : '100%',
				rows        : 4,
				rules       : {
					required: 'Comment is required',
				},
			},
			{
				name        : 'document',
				controlType : 'fileUpload',
				width       : '100%',
				type        : 'card',
			},
		],
	},
];

const OPERATION_PROCEDURE_CONTROLS = [
	{
		name        : 'instruction',
		controlType : 'textarea',
		width       : '100%',
		label       : 'Notes',
		rows        : 4,
		rules       : {
			required: 'Heading is required',
		},
	},
	{
		name        : 'url_links',
		controlType : 'fileUpload',
		width       : '100%',
		type        : 'card',
	},
];

export const MODE_CONTROLS_MAPPING = {
	get_api  : OCEAN_CONTROLS,
	list_api : OPERATION_PROCEDURE_CONTROLS,
};

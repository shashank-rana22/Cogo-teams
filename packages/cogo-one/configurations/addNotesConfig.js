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
		name        : 'heading',
		controlType : 'input',
		type        : 'text',
		width       : '100%',
		label       : 'Heading',
		rows        : 4,
		rules       : {
			required: 'Heading is required',
		},
	},
	{
		controlType        : 'fieldArray',
		name               : 'instruction_items',
		noDeleteButtonTill : 1,
		defaultValues:
			{
				instruction : '',
				file        : '',
			},
		width        : '100%',
		customStyles : {
			flexDirection : 'column',
			alignItems    : 'flex-start',
			border        : '1px solid #e0e0e0',
			borderRadius  : '8px',
			padding       : '8px',
			margin        : '8px 0',
		},
		showAddButton : true,
		buttonText    : '+ Add More',
		rules         : { required: { value: true, message: 'Atleast one is required' } },
		controls      : [
			{
				controlType : 'textarea',
				name        : 'instruction',
				width       : '100%',
				placeholder : 'Start typing to add SOP/Remarks..',
				rows        : 3,
			},
			{
				controlType     : 'fileUpload',
				name            : 'file',
				multiple        : true,
				onlyURLOnChange : true,
				width           : '100%',
				type            : 'card',
			},
		],
	},
];

export const MODE_CONTROLS_MAPPING = {
	get_api  : OCEAN_CONTROLS,
	list_api : OPERATION_PROCEDURE_CONTROLS,
};

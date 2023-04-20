const controls = [
	{
		name        : 'heading',
		type        : 'text',
		label       : 'Form Heading',
		placeholder : 'Enter form heading',
		style       : {
			flexBasis: '25%',
		},
	},
	{
		name        : 'api_url',
		type        : 'text',
		label       : 'API Url',
		placeholder : 'Enter API url ',
		style       : {
			flexBasis: '25%',
		},
	},
	{
		name        : 'buttonText',
		type        : 'text',
		label       : 'Submit Button Label',
		placeholder : 'Enter submit button label',
		style       : {
			flexBasis: '25%',
		},
	},
	{

		name  : 'controls',
		label : 'Add Controls',
		type  : 'fieldArray',
		value : [
			{
				name        : '',
				type        : '',
				placeholder : '',
				number      : '',
				editor      : {},
			},
		],
		controls: [
			{
				name        : 'label',
				type        : 'text',
				label       : 'Label',
				placeholder : 'Enter Label',
				style       : {
					flexBasis: '25%',
				},
			},
			{
				name        : 'type',
				type        : 'select',
				label       : 'Select type',
				placeholder : 'Select type',
				style       : {
					flexBasis: '25%',
				},
				options: [
					{
						label : 'text',
						value : 'text',
					},
					{
						label : 'number',
						value : 'number',
					},
					{
						label : 'select',
						value : 'select',
					},
					{
						label : 'multiSelect',
						value : 'multiSelect',
					},
					{
						label : 'asyncSelect',
						value : 'asyncSelect',
					},
					{
						label : 'datePicker',
						value : 'datePicker',
					},
					{
						label : 'mobileNumber',
						value : 'mobileNumber',
					},
					{
						label : 'chips',
						value : 'chips',
					},
					{
						label : 'radioGroup',
						value : 'radioGroup',
					},
					{
						label : 'textarea',
						value : 'textarea',
					},
					{
						label : 'editor',
						value : 'editor',
					},
				],
			},
			{
				name  : 'placeholder',
				type  : 'text',
				label : 'Enter Placeholder',
				style : {
					flexBasis: '25%',
				},
				placeholder: 'Enter Placeholder',
			},
			{
				name  : 'width',
				type  : 'select',
				label : 'Width',
				style : {
					flexBasis: '25%',
				},
				placeholder : 'Enter width',
				options     : [
					{
						label : '25%',
						value : '25%',
					},
					{
						label : '50%',
						value : '50%',
					},
					{
						label : '75%',
						value : '25%',
					},
					{
						label : '100%',
						value : '100%',
					},
				],
			},
			{
				name  : 'options_type',
				type  : 'radioGroup',
				label : 'Data type',
				style : {
					flexBasis: '50%',
				},
				options: [
					{
						label : 'Dynamic Data',
						value : 'dynamic_data',
					},
					{
						label : 'Manual Data',
						value : 'manual_data',
					},
				],
			},
			{
				name  : 'is_mandetory',
				type  : 'radioGroup',
				label : 'Is Mandetory',
				style : {
					flexBasis: '50%',
				},
				options: [
					{
						label : 'Yes',
						value : 'yes',
					},
					{
						label : 'No',
						value : 'no',
					},
				],
			},
			{
				name  : 'manual_options',
				type  : 'editor',
				label : 'Enter Options',
				style : {
					flexBasis: '50%',
				},
				height : '150px',
				mode   : 'json',
			},
			{
				name  : 'dynamic_data_endpoint',
				type  : 'text',
				label : 'Enter Options Endpoint',
				style : {
					flexBasis: '25%',
				},
			},
		],
	}];

export default controls;

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
		rules: { required: true },
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
		name               : 'controls',
		label              : 'Add Controls',
		type               : 'fieldArray',
		noDeleteButtonTill : 1,
		value              : [
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
				rules: { required: true },
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
						label : 'Text',
						value : 'text',
					},
					{
						label : 'Number',
						value : 'number',
					},
					{
						label : 'Select',
						value : 'select',
					},
					{
						label : 'Multi-Select',
						value : 'multiSelect',
					},
					{
						label : 'Async-Select',
						value : 'asyncSelect',
					},
					{
						label : 'DatePicker',
						value : 'datePicker',
					},
					{
						label : 'Mobile Number',
						value : 'mobileNumber',
					},
					{
						label : 'Chips',
						value : 'chips',
					},
					{
						label : 'RadioGroup',
						value : 'radioGroup',
					},
					{
						label : 'Textarea',
						value : 'textarea',
					},
					{
						label : 'Editor',
						value : 'editor',
					},
				],
				rules: { required: true },
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
						value : '75%',
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
				rules: { required: true },
			},
			{
				name  : 'options',
				type  : 'editor',
				label : 'Enter Options',
				style : {
					flexBasis: '50%',
				},
				height : '150px',
				mode   : 'json',
				rules  : { required: true },
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
				rules  : { required: true },
			},
			{
				name  : 'dynamic_data_endpoint',
				type  : 'text',
				label : 'Enter Options Endpoint',
				style : {
					flexBasis: '50%',
				},
				rules: { required: true },
			},
			{
				name        : 'label_key',
				type        : 'text',
				label       : 'Label key',
				placeholder : 'Enter label key',
				style       : {
					flexBasis: '25%',
				},
				rules: { required: true },
			},
			{
				name        : 'value_key',
				type        : 'text',
				label       : 'Value key',
				placeholder : 'Enter value key',
				style       : {
					flexBasis: '25%',
				},
				rules: { required: true },
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
		],
	}];

export default controls;

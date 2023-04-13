const getControls = ({ mode }) => [
	{
		name        : 'question_text',
		label       : 'Question',
		type        : 'input',
		placeholder : 'Type Question',
		disabled    : mode === 'view',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'question_type',
		label       : 'Answer type',
		type        : 'select',
		placeholder : 'Select Answer type',
		disabled    : mode === 'view',
		options     : [
			{ label: 'Single Correct', value: 'single_correct' },
			{ label: 'Multi Correct', value: 'multi_correct' },
			{ label: 'Subjective Answer', value: 'subjective_answer' },
		],
		// rules: { required: 'This is required' },
	},
	{
		name        : 'options',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add another option',
		disabled    : mode === 'view',
		value       : [
			{
				answer_text : '',
				is_correct  : 'false',
			},
		],
		controls: [
			{
				name        : 'answer_text',
				type        : 'input',
				disabled    : mode === 'view',
				placeholder : 'type option',
				rules       : { required: 'Required' },

			},
			{
				name    : 'is_correct',
				type    : 'chips',
				options : [
					{ value: 'true', label: 'True', disabled: mode === 'view' },
					{ value: 'false', label: 'False', disabled: mode === 'view' },
				],
				value    : 'false',
				rules    : { required: 'Required' },
				multiple : false,
			},
		],
	},
	{
		name    : 'difficulty_level',
		type    : 'chips',
		label   : 'Set Difficulty level',
		rules   : { required: 'Required' },
		options : [
			{ value: 'low', label: 'Low', disabled: mode === 'view' },
			{ value: 'medium', label: 'Medium', disabled: mode === 'view' },
			{ value: 'high', label: 'High', disabled: mode === 'view' },
		],
		multiple: false,
	},
	{
		name        : 'explanation',
		type        : 'textarea',
		disabled    : mode === 'view',
		placeholder : 'Type Explanation...',
		rows        : 4,
	},
];

export default getControls;

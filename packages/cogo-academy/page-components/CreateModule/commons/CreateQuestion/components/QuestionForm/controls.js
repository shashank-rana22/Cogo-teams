const controls = [
	{
		name        : 'case_questions',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add',
		value       : [
			{
				question         : '',
				question_type    : '',
				options          : [{ option: '' }],
				difficulty_level : '',
			},
		],
		controls: [
			{
				name        : 'question_text',
				label       : 'Question',
				type        : 'input',
				placeholder : 'Type Question',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'question_type',
				label       : 'Answer type',
				type        : 'select',
				placeholder : 'Select Answer type',
				options     : [
					{ label: 'Single Correct', value: 'single_correct' },
					{ label: 'Multi Correct', value: 'multi_correct' },
				],
				rules: { required: 'This is required' },
			},
			{
				name        : 'options',
				type        : 'fieldArray',
				showButtons : true,
				buttonText  : 'Add another option',
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
						placeholder : 'type option',
						rules       : { required: 'Required' },

					},
					{
						name    : 'is_correct',
						type    : 'chips',
						options : [
							{ value: 'true', label: 'True' },
							{ value: 'false', label: 'False' },
						],
						value    : 'false',
						rules    : { required: 'Required' },
						multiple : false,
					},
				],
			},
			{
				name        : 'explanation',
				type        : 'textarea',
				placeholder : 'Type Explanation...',
				rows        : 4,
			},
		],
	},
];

export default controls;

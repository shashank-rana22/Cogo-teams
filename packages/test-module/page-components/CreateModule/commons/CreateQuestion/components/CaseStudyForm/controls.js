const getControls = () => [
	{
		name        : 'case_description',
		type        : 'textarea',
		placeholder : 'Type Case...',
		rules       : { required: 'This is required' },
		rows        : 4,
	},
	{
		name        : 'case_questions',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add',
		value       : [
			{
				question         : '',
				answer_type      : '',
				options          : [{ option: '' }],
				difficulty_level : '',
			},
		],
		controls: [
			{
				name        : 'question',
				label       : 'Question',
				type        : 'input',
				placeholder : 'Type Question',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'answer_type',
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
						option: '',
					},
				],
				controls: [
					{
						name        : 'option',
						type        : 'input',
						placeholder : 'type option',
						rules       : { required: 'Required' },

					},
				],
			},
		],
	},
];

export default getControls;

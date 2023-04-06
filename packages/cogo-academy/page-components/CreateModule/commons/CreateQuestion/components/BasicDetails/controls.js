const getControls = ({ mode }) => [
	{
		name        : 'topic',
		label       : 'Topic',
		type        : 'input',
		disabled    : true,
		placeholder : 'Question Topic',
		rules       : { required: 'This is required' },
	},
	{
		name    : 'question_type',
		type    : 'chips',
		label   : 'Pick Question Type',
		value   : 'stand_alone',
		options : [
			{ value: 'stand_alone', label: 'Stand Alone' },
			{ value: 'case_study', label: 'Case Study' },
		],
		multiple: false,
	},
	{
		name    : 'difficulty_level',
		type    : 'chips',
		label   : 'Set Difficulty level',
		options : [
			{ value: 'low', label: 'Low', disabled: mode === 'view' },
			{ value: 'medium', label: 'Medium', disabled: mode === 'view' },
			{ value: 'high', label: 'High', disabled: mode === 'view' },
		],
		rules    : { required: 'Required' },
		multiple : false,
	},
	{
		name        : 'question_text',
		type        : 'textarea',
		placeholder : 'Type Case...',
		disabled    : mode === 'view',
		rules       : { required: 'This is required' },
		rows        : 4,
	},
];

export default getControls;

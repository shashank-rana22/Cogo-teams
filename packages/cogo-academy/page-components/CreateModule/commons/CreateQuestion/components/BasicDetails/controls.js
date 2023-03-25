const getControls = () => [
	{
		name        : 'topic',
		label       : 'Topic',
		type        : 'input',
		disabled    : true,
		placeholder : 'Question Topic',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'audience_ids',
		label       : 'User Groups',
		type        : 'multi-select',
		placeholder : 'Select users',
		options     : [{ label: 'KAM1', value: 'kam1' }, { label: 'KAM2', value: 'kam2' }],
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
			{ value: 'low', label: 'Low' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'high', label: 'High' },
		],
		rules    : { required: 'Required' },
		multiple : false,
	},
	{
		name        : 'question_text',
		type        : 'textarea',
		placeholder : 'Type Case...',
		rules       : { required: 'This is required' },
		rows        : 4,
	},
];

export default getControls;

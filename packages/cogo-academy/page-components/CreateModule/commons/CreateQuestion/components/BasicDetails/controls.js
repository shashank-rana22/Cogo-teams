const getControls = () => [
	{
		name        : 'topic',
		label       : 'Topic',
		type        : 'select',
		placeholder : 'Question Topic',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'user_groups',
		label       : 'User Groups',
		type        : 'select',
		placeholder : 'Select users',
		rules       : { required: 'This is required' },
	},
	{
		name    : 'question_type',
		type    : 'chips',
		label   : 'Pick Question Type',
		options : [
			{ value: 'stand_alone', label: 'Stand Alone' },
			{ value: 'case_study', label: 'Case Study' },
		],
		multiple: false,
	},
];

export default getControls;

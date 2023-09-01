const OPTIONS = [
	{
		value : 'very_satisfied',
		label : 'Very Satisfied',
	},
	{
		value : 'somewhat_satisfied',
		label : 'Somewhat Satisfied',
	},
	{
		value : 'neutral',
		label : 'Neutral',
	},
	{
		value : 'somewhat_dissatisfied',
		label : 'Somewhat Dissatisfied',
	},
	{
		value : 'very_dissatisfied',
		label : 'Very Dissatisfied',
	},
];

const CONTROLS = [
	{
		label       : 'Last Working Day*',
		name        : 'last_working_day',
		type        : 'date',
		placeholder : 'Select your answer',
		rules       : { required: true },
	},
	{
		label       : 'Primary factors influencing your decision to leave*',
		name        : 'reason',
		type        : 'text',
		placeholder : 'Select your answer',
		rules       : { required: true },
	},
	{
		label   : 'Work Experience',
		name    : 'work_experience',
		type    : 'radioGroup',
		options : OPTIONS,
		rules   : { required: true },
	},
	{
		label   : 'Culture',
		name    : 'culture',
		type    : 'radioGroup',
		options : OPTIONS,
		rules   : { required: true },
	},
	{
		label   : 'Learning Curve',
		name    : 'learning_curve',
		type    : 'radioGroup',
		options : OPTIONS,
		rules   : { required: true },
	},
];

export default CONTROLS;

const getControls = () => [
	{
		name  : 'test_validity',
		label : 'Test Validity',
		type  : 'date-picker',
		rules : { required: 'This is required' },
	},
	{
		name        : 'test_duration_hr',
		label       : 'Duration',
		type        : 'number',
		placeholder : '00 hr',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'test_duration_min',
		type        : 'number',
		placeholder : '00 min',
		rules       : { required: 'This is required', max: 60 },
	},
	{
		name        : 'maximum_attempts',
		label       : 'Attempts Allowed',
		type        : 'input',
		placeholder : '0',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'cut_off_marks',
		label       : 'Minimum Pass %',
		type        : 'input',
		placeholder : 'type %',
		rules       : { required: 'This is required' },
	},

];

export default getControls;

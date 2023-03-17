const getControls = () => [
	{
		name  : 'test_validity',
		label : 'Test Validity',
		type  : 'date-picker',
		rules : { required: 'This is required' },
	},
	{
		name        : 'test_duration_min',
		label       : 'Duration(in min)',
		type        : 'number',
		placeholder : '0',
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

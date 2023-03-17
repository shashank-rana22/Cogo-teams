const getControls = () => [
	{
		name  : 'test_validity',
		label : 'Test Validity',
		type  : 'inputgroup',
		rules : { required: 'This is required' },
	}, {
		name        : 'duration',
		label       : 'Duration',
		type        : 'input',
		placeholder : '00 h : 00 min',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'attempts_allowed',
		label       : 'Attempts Allowed',
		type        : 'select',
		placeholder : '3',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'min_pass',
		label       : 'Minimum Pass %',
		type        : 'input',
		placeholder : 'type %',
		rules       : { required: 'This is required' },
	},

];

export default getControls;

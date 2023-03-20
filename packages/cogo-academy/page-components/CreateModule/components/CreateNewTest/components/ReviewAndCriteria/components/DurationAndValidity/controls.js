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
		rules       : {
			required : 'This is required',
			min      : {
				value   : 1,
				message : 'Should be greater than 0',
			},
		},
	},
	{
		name        : 'maximum_attempts',
		label       : 'Attempts Allowed',
		type        : 'number',
		placeholder : '0',
		rules       : {
			required : 'This is required',
			min      : {
				value   : 0,
				message : 'Should be greater than 0',
			},
		},
	},
	{
		name        : 'cut_off_marks',
		label       : 'Minimum Pass %',
		type        : 'number',
		placeholder : 'type %',
		rules       : {
			required : 'This is required',
			min      : {
				value   : 0,
				message : 'Should be greater than 0',
			},
		},
	},

];

export default getControls;

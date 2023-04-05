const controls = [
	{
		name           : 'test_validity',
		label          : 'Test Validity',
		type           : 'date-picker',
		showTimeSelect : true,
		rules          : { required: 'This is required' },
	},
	{
		name        : 'test_duration',
		label       : 'Duration(in min)',
		type        : 'number',
		value       : '60',
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
		value       : '1',
		placeholder : '1',
		disabled    : true,
	},
	{
		name        : 'cut_off_percentage',
		label       : 'Cutoff Pass %',
		type        : 'number',
		placeholder : 'type %',
		rules       : {
			required : 'This is required',
			min      : {
				value   : 1,
				message : 'Invalid',
			},
			max: {
				value   : 100,
				message : 'Invalid',
			},
		},
	},
];

export default controls;

const controls = (item) => {
	const { id = '', lower_limit = 0, upper_limit = 0, score = 0 } = item || {};

	return ([
		{
			name        : `${id}_age_from`,
			label       : 'AGE FROM (DAYS)',
			placeholder : '0',
			type        : 'number',
			value       : `${lower_limit}`,
			rules       : {
				required : 'Required',
				validate : (value) => ((value < 0 || value > 90) ? 'invalid' : true),
			},
			isClearable: true,
		},
		{
			name        : `${id}_age_to`,
			label       : 'AGE TO (DAYS)',
			placeholder : '0',
			type        : 'number',
			value       : `${upper_limit}`,
			rules       : {
				required : 'Required',
				validate : (value) => ((value < 0 || value > 90) ? 'invalid' : true),
			},
			isClearable: true,
		},
		{
			name        : `${id}_multiplier`,
			label       : 'MULTIPLIER',
			placeholder : '0',
			type        : 'number',
			value       : score,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
	]);
};

export default controls;

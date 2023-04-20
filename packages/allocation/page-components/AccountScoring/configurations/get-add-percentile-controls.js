const controls = (item) => {
	const { id = '', lower_limit = 0, upper_limit = 0, score = 0 } = item || {};

	return ([
		{
			name        : `${id}_percentile_from`,
			label       : 'PERCENTILE FROM',
			placeholder : '0',
			type        : 'text',
			value       : lower_limit,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${id}_percentile_to`,
			label       : 'PERCENTILE TO',
			placeholder : '0',
			type        : 'text',
			value       : upper_limit,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${id}_bias_score`,
			label       : 'BIAS SCORE',
			placeholder : '0',
			type        : 'text',
			value       : score,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
	]);
};

export default controls;

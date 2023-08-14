const MIN = 0;
const MAX = 90;

const controls = (item) => {
	const { id = '', lower_limit = 0, upper_limit = 0, score = 0 } = item || {};

	return ([
		{
			name        : `${id}_percentile_from`,
			label       : 'PERCENTILE FROM',
			placeholder : '0',
			type        : 'number',
			value       : `${lower_limit}`,
			rules       : {
				required : 'Required',
				validate : (value) => ((value < MIN || value > MAX) ? 'invalid' : true),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
		{
			name        : `${id}_percentile_to`,
			label       : 'PERCENTILE TO',
			placeholder : '0',
			type        : 'number',
			value       : `${upper_limit}`,
			rules       : {
				required : 'Required',
				validate : (value) => ((value < MIN || value > MAX) ? 'invalid' : true),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
		{
			name        : `${id}_bias_score`,
			label       : 'BIAS SCORE',
			placeholder : '0',
			type        : 'number',
			value       : score,
			rules       : {
				required: 'Required',
			},
			isClearable : true,
			min         : 0,
		},
	]);
};

export default controls;

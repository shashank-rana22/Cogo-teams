const MIN = 0;
const MAX = 90;

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
				validate : (value) => ((value < MIN || value > MAX) ? 'invalid' : true),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
		{
			name        : `${id}_age_to`,
			label       : 'AGE TO (DAYS)',
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
			name        : `${id}_multiplier`,
			label       : 'MULTIPLIER',
			placeholder : '0',
			type        : 'number',
			value       : score,
			rules       : {
				required: 'Required',
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
	]);
};

export default controls;

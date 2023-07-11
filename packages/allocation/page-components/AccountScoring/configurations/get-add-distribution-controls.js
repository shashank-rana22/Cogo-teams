const MIN = 0;
const MAX = 90;

const controls = (item) => {
	const { id = '', lower_limit = 0, upper_limit = 0 } = item || {};

	return ([
		{
			name        : `${id}_range_from`,
			label       : 'RANGE FROM',
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
			name        : `${id}_range_to`,
			label       : 'RANGE TO',
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
	]);
};

export default controls;

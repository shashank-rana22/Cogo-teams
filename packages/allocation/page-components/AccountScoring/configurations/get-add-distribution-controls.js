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
				validate : (value) => ((value < 0 || value > 10) ? 'invalid' : true),
			},
			isClearable: true,
		},
		{
			name        : `${id}_range_to`,
			label       : 'RANGE TO',
			placeholder : '0',
			type        : 'number',
			value       : `${upper_limit}`,
			rules       : {
				required : 'Required',
				validate : (value) => ((value < 0 || value > 10) ? 'invalid' : true),
			},
			isClearable: true,
		},
	]);
};

export default controls;

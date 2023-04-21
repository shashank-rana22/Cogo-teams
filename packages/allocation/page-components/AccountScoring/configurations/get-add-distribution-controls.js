const controls = (item) => {
	const { id = '', lower_limit = 0, upper_limit = 0 } = item || {};

	return ([
		{
			name        : `${id}_range_from`,
			label       : 'RANGE FROM',
			placeholder : '0',
			type        : 'text',
			value       : lower_limit,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${id}_range_to`,
			label       : 'RANGE TO',
			placeholder : '0',
			type        : 'text',
			value       : upper_limit,
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
	]);
};

export default controls;

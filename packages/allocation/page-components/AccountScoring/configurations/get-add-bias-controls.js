const controls = (item) => {
	const key_val = item || '';

	return ([
		{
			name        : `${key_val}_age_from`,
			label       : 'AGE FROM (DAYS)',
			placeholder : '0',
			type        : 'text',
			// rules       : {
			// 	required: 'Required',
			// },
			isClearable : true,
		},
		{
			name        : `${key_val}_age_to`,
			label       : 'AGE TO (DAYS)',
			placeholder : '0',
			type        : 'text',
			// rules       : {
			// 	required: 'Required',
			// },
			isClearable : true,
		},
		{
			name        : `${key_val}_multiplier`,
			label       : 'MULTIPLIER',
			placeholder : '0',
			type        : 'text',
			// rules       : {
			// 	required: 'Required',
			// },
			isClearable : true,
		},
	]);
};

export default controls;

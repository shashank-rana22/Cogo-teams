const controls = (item) => {
	const key_val = item || '';

	return ([
		{
			name        : `${key_val}_percentile_from`,
			label       : 'PERCENTILE FROM',
			placeholder : '0',
			type        : 'text',
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${key_val}_percentile_to`,
			label       : 'PERCENTILE TO',
			placeholder : '0',
			type        : 'text',
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${key_val}_bias_score`,
			label       : 'BIAS SCORE',
			placeholder : '0',
			type        : 'text',
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${key_val}_number_of_accounts`,
			label       : 'NUMBER OF ACCOUNTS',
			placeholder : '0',
			type        : 'text',
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
	]);
};

export default controls;

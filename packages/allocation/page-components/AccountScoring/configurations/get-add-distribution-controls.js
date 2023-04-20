const controls = (item) => {
	const key_val = item || '';

	return ([
		{
			name        : `${key_val}_range_from`,
			label       : 'RANGE FROM',
			placeholder : '0',
			type        : 'text',
			rules       : {
				required: 'Required',
			},
			isClearable: true,
		},
		{
			name        : `${key_val}_range_to`,
			label       : 'RANGE TO',
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

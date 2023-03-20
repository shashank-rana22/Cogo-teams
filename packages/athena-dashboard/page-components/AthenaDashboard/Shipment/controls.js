const controls = [
	{
		name        : 'country',
		type        : 'asyncSelect',
		// asyncKey    : 'countries',
		asyncKey    : 'countries',
		valueKey    : 'name',
		initialCall : true,
		multiple    : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},

	},
];

export default controls;

const origin_country = [
	{
		name        : 'origin_country',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
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

export default origin_country;

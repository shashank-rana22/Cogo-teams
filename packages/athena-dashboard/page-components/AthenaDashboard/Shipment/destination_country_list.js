const destination_country = [
	{
		name        : 'destination_country',
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

export default destination_country;

const origin_port = [
	{
		name        : 'origin_port',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : true,
		multiple    : true,
		params      : {
			filters: {
				type: ['seaport', 'airport'],
			},
		},

	},
];

export default origin_port;

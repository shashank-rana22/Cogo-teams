const destination_port = [
	{
		name        : 'destination_port',
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

export default destination_port;

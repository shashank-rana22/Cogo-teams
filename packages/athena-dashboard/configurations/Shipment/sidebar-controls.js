const controls = [
	{
		name        : 'origin_country',
		placeholder : 'Enter Country...',
		label       : 'Origin Country',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},

	},
	{
		name        : 'destination_country',
		placeholder : 'Enter Country...',
		label       : 'Destination Country',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},

	},
	{
		name        : 'origin_port',
		placeholder : 'Enter Port...',
		label       : 'Origin Port',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['seaport', 'airport'],
			},
		},

	},
	{
		name        : 'destination_port',
		placeholder : 'Enter Port...',
		label       : 'Destination Port',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['seaport', 'airport'],
			},
		},

	},
];
export default controls;

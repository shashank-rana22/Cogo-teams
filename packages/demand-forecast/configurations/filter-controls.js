const getControls = () => {
	const filterControls = [
		{
			name        : 'origin_location_id',
			label       : 'Origin Port',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			placeholder : 'Origin Port',
			params      : {
				filters: {
					type: ['seaport'],
				},
			},
			initialCall : true,
			isClearable : true,
		},
		{
			name        : 'destination_location_id',
			label       : 'Destination Port',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			placeholder : 'Destination Port',
			initialCall : true,
			isClearable : true,
		},
	];

	return filterControls;
};

export default getControls;

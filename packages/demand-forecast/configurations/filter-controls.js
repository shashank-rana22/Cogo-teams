const getControls = () => {
	const filterControls = [
		{
			name        : 'origin',
			label       : 'Origin',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			placeholder : 'Origin Port',
			initialCall : true,
			isClearable : true,
		},
		{
			name        : 'destination',
			label       : 'Destination Port',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			placeholder : 'Destination Port',
			initialCall : true,
			isClearable : true,
		},
		{
			name    : 'service_type',
			label   : 'Service Type',
			type    : 'chips',
			options : [
				{
					label : 'FCL',
					value : 'fcl_freight',
				},
				{
					label : 'LCL',
					value : 'lcl_freight',
				},
				{
					label : 'AIR',
					value : 'air_freight',
				},
			],
		},
	];

	return filterControls;
};

export default getControls;

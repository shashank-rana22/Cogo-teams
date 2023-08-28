const getControls = () => {
	const filterControls = [
		{
			name        : 'origin_cluster_id',
			label       : 'Origin Port',
			type        : 'asyncSelect',
			asyncKey    : 'list_pricing_zones',
			placeholder : 'Origin Port',
			initialCall : true,
			isClearable : true,
		},
		{
			name        : 'destination_cluster_id',
			label       : 'Destination Port',
			type        : 'asyncSelect',
			asyncKey    : 'list_pricing_zones',
			placeholder : 'Destination Port',
			initialCall : true,
			isClearable : true,
		},
	];

	return filterControls;
};

export default getControls;

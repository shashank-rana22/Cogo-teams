const getControls = ({ t }) => {
	const filterControls = [
		{
			name        : 'origin_cluster_id',
			label       : t('demandForecast:origin_port'),
			type        : 'asyncSelect',
			asyncKey    : 'list_pricing_zones',
			placeholder : 'Origin Port',
			initialCall : true,
			isClearable : true,
		},
		{
			name        : 'destination_cluster_id',
			label       : t('demandForecast:destination_port'),
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

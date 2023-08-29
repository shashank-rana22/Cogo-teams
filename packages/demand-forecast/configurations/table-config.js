const getTableConfig = ({ t }) => {
	const config = [
		{
			key   : 'origin',
			title : t('demandForecast:origin'),
			width : '27%',
		},
		{
			key   : 'destination',
			title : t('demandForecast:destination'),
			width : '24%',
		},
		{
			key   : 'high_demand_port_pairs',
			title : t('demandForecast:high_demand_port_pairs'),
			width : '8%',
		},
		{
			key   : 'rated_acquired',
			title : t('demandForecast:rated_added'),
			width : '10%',
		},
		{
			key   : 'forecasted_demand',
			title : t('demandForecast:forecasted_demand'),
			width : '15%',
		},
		{
			key   : 'action',
			width : '4%',
		},
	];

	return config;
};

export default getTableConfig;

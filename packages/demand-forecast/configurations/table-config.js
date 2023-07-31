const getTableConfig = () => {
	const config = [
		{
			key   : 'origin',
			title : 'ORGIN',
			width : '24%',
		},
		{
			key   : 'destination',
			title : 'DESTINATION',
			width : '24%',
		},
		{
			key   : 'high_demand_port_pairs',
			title : 'HIGH DEMAND PORT PAIRS',
			width : '8%',
		},
		{
			key   : 'rated_acquired',
			title : 'RATES ADDED',
			width : '10%',
		},
		{
			key   : 'forecasted_demand',
			title : 'FORECASTED DEMAND',
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

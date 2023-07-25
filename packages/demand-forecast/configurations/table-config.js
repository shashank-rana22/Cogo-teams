const getTableConfig = () => {
	const config = [{
		key   : 'action',
		width : '5%',
	},
	{
		key   : 'service_type',
		title : 'SERVICE TYPE',
		width : '12%',
	},
	{
		key   : 'origin',
		title : 'ORGIN',
		width : '25%',
	},
	{
		key   : 'destination',
		title : 'DESTINATION',
		width : '25%',
	},
	{
		key   : 'forecasted_demand',
		title : 'FORECASTED DEMAND',
		width : '12%',
	},
	{
		key   : 'start',
		width : '12%',
	},
	];

	return config;
};

export default getTableConfig;

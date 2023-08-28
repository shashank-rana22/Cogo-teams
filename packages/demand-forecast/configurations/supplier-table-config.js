const getSupplierTableConfig = ({ t }) => {
	const config = [
		{
			key   : 'supplier',
			title : t('demandForecast:supplier'),
			width : '40%',
		},
		{
			key   : 'win_probability',
			title : t('demandForecast:win_probability'),
			width : '15%',
		},
		{
			key   : 'capability',
			title : t('demandForecast:capability'),
			width : '15%',
		},
		{
			key   : 'rated_acquired',
			title : t('demandForecast:rated_added'),
			width : '15%',
		},
		{
			key   : 'ask_for_rates',
			width : '15%',
		},
	];

	return config;
};

export default getSupplierTableConfig;

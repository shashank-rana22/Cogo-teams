const getSupplierTableConfig = () => {
	const config = [
		{
			key   : 'supplier',
			title : 'SUPPLIER',
			width : '40%',
		},
		{
			key   : 'win_probability',
			title : 'WIN PROBABILITY',
			width : '15%',
		},
		{
			key   : 'capability',
			title : 'CAPABILITY',
			width : '15%',
		},
		{
			key   : 'rated_acquired',
			title : 'RATES ADDED',
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

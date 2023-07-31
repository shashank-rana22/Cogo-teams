const getSupplierTableConfig = () => {
	const config = [
		{
			key   : 'supplier',
			title : 'Suppliers',
			width : '40%',
		},
		{
			key   : 'potential',
			title : 'Potential',
			width : '15%',
		},
		{
			key   : 'capability',
			title : 'Capability',
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

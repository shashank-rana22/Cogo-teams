const useGetScoringConfigs = () => {
	const list = [
		{
			id             : 1,
			status         : 'active',
			display_name   : 'Test Scoring',
			cogo_entity_id : 11,
			cogo_entity    : {
				id            : 123,
				business_name : 'COGO FREIGHT PVT LTD.',
			},
			channel       : 'sme',
			role_function : 'sales',
			roles         : [
				{
					id   : 1234,
					name : 'KAM SME Demand',
				},
				{
					id   : 1233,
					name : 'KAM Manager SME Demand',
				},
			],
			created_at  : new Date(),
			activate_at : new Date(),
		},
		{
			id             : 2,
			status         : 'active',
			display_name   : 'Test Scoring',
			cogo_entity_id : 21,
			cogo_entity    : {
				id            : 223,
				business_name : 'COGOPORT Vietnam',
			},
			channel       : 'enterprise',
			role_function : 'sales',
			roles         : [
				{
					id   : 2234,
					name : 'KAM Enterprise Demand',
				},
				{
					id   : 2233,
					name : 'KAM Manager SME Enterprise',
				},
				{
					id   : 2235,
					name : 'Enterprise Head',
				},
			],
			created_at  : new Date(),
			activate_at : new Date(),
		},
	];

	return {
		list,
	};
};

export default useGetScoringConfigs;

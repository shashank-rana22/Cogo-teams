const getSubTableConfig = () => {
	const config = {
		port_pairs: [
			{
				orgin_port             : 'Shanghai (CNSHA), China',
				destination_port       : 'Jawaharlal Nehru (INNSA), India',
				high_demand_port_pairs : 'NA',
				rates_added            : '10',
				forecasted_demand      : '200 TEUs',
			}, {
				orgin_port             : 'Shanghai (CNSHA), China',
				destination_port       : 'Jawaharlal Nehru (INNSA), India',
				high_demand_port_pairs : 'NA',
				rates_added            : '7',
				forecasted_demand      : '200 TEUs',
			}, {
				orgin_port             : 'Shanghai (CNSHA), China',
				destination_port       : 'Jawaharlal Nehru (INNSA), India',
				high_demand_port_pairs : 'NA',
				rates_added            : '6',
				forecasted_demand      : '200 TEUs',
			}, {
				orgin_port             : 'Shanghai (CNSHA), China',
				destination_port       : 'Jawaharlal Nehru (INNSA), India',
				high_demand_port_pairs : 'NA',
				rates_added            : '3',
				forecasted_demand      : '200 TEUs',
			},
		],
		mini_clusters: [
			{
				orgin_port             : 'South India',
				destination_port       : 'Middle East',
				high_demand_port_pairs : 'NA',
				rates_added            : '3',
				forecasted_demand      : '200 TEUs',
			},
		],
	};

	return config;
};

export default getSubTableConfig;

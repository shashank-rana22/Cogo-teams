const getDataConfig = () => {
	const dataConfig = [
		{
			orgin_port        : 'West India',
			destination_port  : 'Middle East',
			forecasted_demand : '200 TEUs',
		}, {
			orgin_port        : 'South India',
			destination_port  : 'Middle East',
			forecasted_demand : '200 TEUs',
		}, {
			orgin_port        : 'North India',
			destination_port  : 'South America',
			forecasted_demand : '200 TEUs',
		}, {
			orgin_port        : 'East India',
			destination_port  : 'South Africa',
			forecasted_demand : '200 TEUs',
		}];

	return dataConfig;
};
export default getDataConfig;

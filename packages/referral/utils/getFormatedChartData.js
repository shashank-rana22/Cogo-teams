const getFormatedChartData = () => {
	const allottedData = [
		{
			id    : 'subscription',
			value : 20 || 0,
			color : '#FCDC00',
		},
		{
			id    : 'kyc',
			value : 30 || 0,
			color : '#ABCD62',
		},
		{
			id    : 'shipment',
			value : 40 || 0,
			color : '#88CAD1',
		},
	];

	const estimatedData = [
		{
			id    : 'subscription',
			value : 20 || 0,
			color : '#FCDC00',
		},
		{
			id    : 'kyc',
			value : 30 || 0,
			color : '#ABCD62',
		},
		{
			id    : 'shipment',
			value : 40 || 0,
			color : '#88CAD1',
		},
	];

	return {
		allottedData,
		estimatedData,
	};
};

export default getFormatedChartData;

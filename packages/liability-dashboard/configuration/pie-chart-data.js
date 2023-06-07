const pieChartData = () => {
	const data = [
		{
			id    : 'Total Cogopoints credited',
			label : 'Total Cogopoints credited',
			value : 20,
			color : 'hsl(231, 70%, 50%)',
		},
		{
			id    : 'Total Redeemable',
			label : 'Total Redeemable',
			value : 60,
			color : 'hsl(155, 70%, 50%)',
		},
		{
			id    : 'Total Locked',
			label : 'Total Locked',
			value : 10,
			color : 'hsl(291, 70%, 50%)',
		},
		{
			id    : 'Total Redeemed',
			label : 'Total Redeemed',
			value : 40,
			color : 'hsl(276, 70%, 50%)',
		},
		{
			id    : 'Total Expired',
			label : 'Total Expired',
			value : 30,
			color : 'hsl(354, 70%, 50%)',
		},
	];

	return { data };
};

export default pieChartData;

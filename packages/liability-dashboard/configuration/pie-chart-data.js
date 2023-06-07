const pieChartData = () => {
	const data = [
		{
			id    : 'Total Cogopoints credited',
			label : 'Total Cogopoints credited',
			value : 400,
			color : 'hsl(231, 70%, 50%)',
		},
		{
			id    : 'Total Redeemable',
			label : 'Total Redeemable',
			value : 169,
			color : 'hsl(155, 70%, 50%)',
		},
		{
			id    : 'Total Locked',
			label : 'Total Locked',
			value : 218,
			color : 'hsl(291, 70%, 50%)',
		},
		{
			id    : 'Total Redeemed',
			label : 'Total Redeemed',
			value : 474,
			color : 'hsl(276, 70%, 50%)',
		},
		{
			id    : 'Total Expired',
			label : 'Total Expired',
			value : 148,
			color : 'hsl(354, 70%, 50%)',
		},
	];

	return { data };
};

export default pieChartData;

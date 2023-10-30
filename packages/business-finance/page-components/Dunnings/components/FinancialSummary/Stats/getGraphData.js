export const getLinearData = ({ statsData }) => ([
	{
		id   : 'Total Outstanding',
		data : (statsData || []).map((item) => ({
			x : `${item?.month} (${item?.year})`,
			y : item?.outstandingAmount,
		})),
	},
	{
		id   : 'Collected',
		data : (statsData || []).map((item) => ({
			x : `${item?.month} (${item?.year})`,
			y : item?.collectedAmount,
		})),
	},
]);

export const getBarData = ({ statsData }) => (statsData || []).map((item) => {
	const { month, collectedAmount, outstandingAmount, year } = item || {};
	return (
		{
			month                : `${month} (${year})`,
			'Collected Amount'   : collectedAmount,
			'Outstanding Amount' : outstandingAmount,
		}
	);
});

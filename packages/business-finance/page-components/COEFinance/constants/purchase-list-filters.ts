function filtersData(statsData) {
	const { INITIATED = '', FINANCE_ACCEPTED = '', ON_HOLD = '' } = statsData || {};

	return [
		{
			label : 'Initiated',
			value : 'INITIATED',
			badge : INITIATED,
		},
		{
			label : 'On Hold',
			value : 'ON_HOLD',
			badge : ON_HOLD || '0',
		},
		{
			label : 'Approved',
			value : 'FINANCE_ACCEPTED',
			badge : FINANCE_ACCEPTED,
		},

	];
}
export default filtersData;

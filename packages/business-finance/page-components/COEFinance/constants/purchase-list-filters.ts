interface StatsDataInterface {
	INITIATED?:string
	FINANCE_ACCEPTED?:string
	ON_HOLD?:string
}
function filtersData(statsData:StatsDataInterface) {
	const { INITIATED = '', FINANCE_ACCEPTED = '', ON_HOLD = '' } = statsData || {};

	return [
		{
			label : 'Initiated',
			value : 'INITIATED',
			badge : INITIATED || '0',
		},
		{
			label : 'On Hold',
			value : 'ON_HOLD',
			badge : ON_HOLD || '0',
		},
		{
			label : 'Approved',
			value : 'FINANCE_ACCEPTED',
			badge : FINANCE_ACCEPTED || '0',
		},

	];
}
export default filtersData;

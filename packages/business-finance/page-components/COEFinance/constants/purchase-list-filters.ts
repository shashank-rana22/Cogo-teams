interface StatsDataInterface {
	INITIATED?:string
	FINANCE_ACCEPTED?:string
	ON_HOLD?: string
	LOCKED?: string
}
function filtersData(statsData:StatsDataInterface) {
	const { LOCKED = '', FINANCE_ACCEPTED = '', ON_HOLD = '' } = statsData || {};

	return [
		{
			label : 'Locked',
			value : 'LOCKED',
			badge : LOCKED || '0',
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

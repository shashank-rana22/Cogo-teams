interface StatsDataInterface {
	INITIATED?:string
	FINANCE_ACCEPTED?:string
	ON_HOLD?:string
	POSTED?:string
	FAILED?:string
}
function filtersData(statsData:StatsDataInterface) {
	const { INITIATED = '', FINANCE_ACCEPTED = '', ON_HOLD = '', POSTED = '', FAILED = '' } = statsData || {};

	const ALL = Object.values(statsData || {}).reduce((total, value) => total + value, 0);

	return [
		{
			label : 'All',
			value : 'ALL',
			badge : ALL || '0',
		},
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
		{
			label : 'Posted',
			value : 'POSTED',
			badge : POSTED || '0',
		},
		{
			label : 'Failed',
			value : 'FAILED',
			badge : FAILED || '0',
		},

	];
}
export default filtersData;

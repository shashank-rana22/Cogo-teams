function filtersData(statsData) {
	const {
		LOCKED = '',
		FINANCE_ACCEPTED = '',
		ON_HOLD = '',
		POSTED = '',
		FAILED = '',
		ALL_INVOICE = '',
	} = statsData || {};

	return [
		{
			label : 'All',
			value : 'ALL',
			badge : ALL_INVOICE || '0',
		},
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

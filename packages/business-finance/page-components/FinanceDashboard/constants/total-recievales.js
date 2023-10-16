function totalRecievablesStats() {
	// const { INITIATED = '', FINANCE_ACCEPTED = '', ON_HOLD = '' } = statsData || {};

	return [
		{
			label : 'All',
			value : 'all',
			// badge : INITIATED,
		},
		{
			label : 'IE',
			value : 'ie',
			// badge : ON_HOLD || '0',
		},
		{
			label : 'ENT',
			value : 'enterprise',
			// badge : FINANCE_ACCEPTED,
		},
		{
			label : 'CP',
			value : 'cp',
			// badge : FINANCE_ACCEPTED,
		},

	];
}
export default totalRecievablesStats;

function totalPayablesStats() {
	// const { INITIATED = '', FINANCE_ACCEPTED = '', ON_HOLD = '' } = statsData || {};

	return [
		{
			label : 'All',
			value : 'all',
			// badge : INITIATED,
		},
		{
			label : 'Shipping Line',
			value : 'shipping_line',
			// badge : ON_HOLD || '0',
		},
		{
			label : 'NVOCC',
			value : 'nvocc',
			// badge : FINANCE_ACCEPTED,
		},
		{
			label : 'Freight Forwarders',
			value : 'freight_forwarders',
			// badge : FINANCE_ACCEPTED,
		},

	];
}
export default totalPayablesStats;

function filtersUrgentData(statsData) {
	const { URGENT_INVOICE_COUNT = '' } = statsData || {};
	return [
		{
			label : 'All',
			value : 'all',
		},
		{
			label : 'Urgent Invoices',
			value : 'Urgency_tag',
			badge : URGENT_INVOICE_COUNT,
		},

	];
}
export default filtersUrgentData;

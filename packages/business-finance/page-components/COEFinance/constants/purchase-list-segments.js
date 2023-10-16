function filtersUrgentData({ itemData, tab }) {
	return [
		{
			label : 'All',
			value : 'ALL',
		},
		{
			label : 'Urgent Invoices',
			value : 'Urgency_tag',
			badge : tab === 'Urgency_tag' ? itemData?.totalRecords : '',
		},

	];
}
export default filtersUrgentData;

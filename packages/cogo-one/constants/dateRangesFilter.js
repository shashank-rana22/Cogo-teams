const PREVIOUS_MONTH = 1;

const dateRangesFilter = () => {
	const today = new Date();

	const currentMonth = today.toLocaleString('default', { month: 'long' });

	today.setMonth(today.getMonth() - PREVIOUS_MONTH);

	const previousMonth = today.toLocaleString('default', { month: 'long' });

	return [
		{ label: 'Today', value: 'today' },
		{ label: 'Yesterday', value: 'yesterday' },
		{ label: 'Last 7 days', value: 'last_7_days' },
		{ label: 'Last 14 days', value: 'last_14_days' },
		{ label: `Last Month (${previousMonth})`, value: 'last_month' },
		{ label: `Current Month (${currentMonth})`, value: 'current_month' },
		{ label: 'Custom', value: 'custom' },
	];
};

export default dateRangesFilter;

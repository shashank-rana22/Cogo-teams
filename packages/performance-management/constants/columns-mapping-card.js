const columnsMapping = ({ columnsToShow = [] }) => {
	const columns = [{
		key   : 'total_feedbacks',
		label : 'Feedbacks Approved',
		flex  : 1.7,
	},
	{
		key   : 'BelowAverage',
		label : 'Below Average Performance',
		flex  : 2.2,
	},
	{
		key   : 'Average',
		label : 'Average Performance',
		flex  : 2,
	},
	{
		key   : 'GoodPerforming',
		label : 'Above Average Performance',
		flex  : 2.2,
	},
	{
		key   : 'team_count',
		label : 'Team Size',
		flex  : 2.5,
	},
	{
		key   : 'pending_count',
		label : 'Feedbacks Pending',
		flex  : 1.9,
	},
	{
		key   : 'rating',
		label : 'Latest KPI',
		flex  : 1.7,
	}];

	return columnsToShow.map((col) => columns.find((c) => c.key === col));
};

export default columnsMapping;

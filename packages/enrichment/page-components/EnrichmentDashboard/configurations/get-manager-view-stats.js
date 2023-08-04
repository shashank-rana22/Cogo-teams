const getManagerViewStats = ({ enrichmentData = {} }) => [
	{
		label : 'Maximum Accounts per Month',
		color : 'orange',
		value : enrichmentData.max_account_closed_per_month_limit,
	},
	{
		label : 'Maximum Accounts',
		color : 'blue',
		value : enrichmentData.max_active_feedback_request,
	},
	{
		label : 'Total Active Accounts',
		color : 'yellow',
		value : enrichmentData.total_active_feedback_request,
	},
	{
		label : 'Remaining Accounts',
		color : 'green',
		value : enrichmentData.account_assign_limit_left,

	},
];

export default getManagerViewStats;

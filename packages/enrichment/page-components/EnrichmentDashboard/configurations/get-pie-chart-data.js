function getPieChartData({ stats = {} }) {
	const total_count = stats.requested_feedback_request_count + stats.total_ongoing_request_count
	+ stats.success_feedback_request_count + stats.failed_feedback_request_count;
	return {

		request_status_chart: {
			title  : `Total Accounts: ${total_count}`,
			colors : ['#DDEBC0', '#ABB0DE', '#EDD7A9', '#F37166'],
			data   : [
				{
					id    : 'active',
					label : 'Active',
					value : stats.requested_feedback_request_count,
				},
				{
					id    : 'ongoing',
					label : 'Ongoing',
					value : stats.total_ongoing_request_count,
				},
				{
					id    : 'success',
					label : 'Success',
					value : stats.success_feedback_request_count,
				},
				{
					id    : 'failed',
					label : 'Failed',
					value : stats.failed_feedback_request_count,
				},
			],
		},
		turnaround_time_chart: {
			title  : 'Turnaround Time',
			colors : ['#DDEBC0', '#ABB0DE', '#EDD7A9', '#F37166'],
			data   : [
				{
					id    : 'zero_to_one_days',
					label : '0-1 Days',
					value : stats.tat_less_than_equal_to_one_day,
				},
				{
					id    : 'one_to_three_days',
					label : '1-3 Days',
					value : stats.tat_one_to_three_day,
				},
				{
					id    : 'three_to_seven_days',
					label : '3-7 Days',
					value : stats.tat_three_to_seven_day,
				},
				{
					id    : 'greater_than_seven_days',
					label : '> 7 Days',
					value : stats.tat_greater_than_seven_day,
				},
			],
		},
	};
}
export default getPieChartData;

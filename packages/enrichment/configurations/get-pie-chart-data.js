function getPieChartData({ stats = {} }) {
	return {
		request_status_chart: {
			title  : 'Status',
			colors : ['#F37166', '#ABCD62'],
			data   : [
				{
					id    : 'requested',
					label : 'Requested',
					value : stats.requested_feedback_request_count,
				},
				{
					id    : 'responded',
					label : 'Responded',
					value : stats.total_responded_request_count,
				},
			],
		},
		turnaround_time_chart: {
			title  : 'Turnaround Time',
			colors : ['#84af18', '#aae11e', '#d0ee82', '#e3f5b5'],
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

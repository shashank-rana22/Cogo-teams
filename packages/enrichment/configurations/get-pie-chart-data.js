function getPieChartData({ stats }) {
	return {
		chart_1: {
			colors : ['#CFEAED', '#ACDADF'],
			data   : [
				{
					id    : 'enrichment_requests',
					label : 'Enrichment Requests',
					value : stats.requested_feedback_request_count,
				},
				{
					id    : 'responded_requests',
					label : 'Responded Requests',
					value : stats.total_responded_request_count,
				},
			],
		},
		chart_2: {
			colors : ['#F7FAEF', '#C4DC91', '#ABCD62', '#849E4C'],
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
					value : stats.tat_greater_than_seven_dat,
				},
			],
		},
	};
}
export default getPieChartData;

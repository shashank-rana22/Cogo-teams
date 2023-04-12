import { startCase } from '@cogoport/utils';

export const getStatsData = (stats) => ({
	feedbacks_received: {
		feedback_type_chart: {
			title  : 'Feedback Type',
			colors : ['#70bfc8', '#47adb8', '#37878f', '#276066'],
			data   : Object.entries(stats.feedback_type_stats || {}).map(([id, value]) => ({
				id,
				label: startCase(id),
				value,
			})),
		},
		feedback_sub_type_chart: {
			title  : 'Feedback Sub-type',
			colors : ['#c2e4e7', '#99d1d8', '#70bfc8', '#47adb8', '#37878f', '#276066'],
			data   : Object.entries(stats.feedback_sub_type_stats || {}).map(([id, value]) => ({
				id,
				label: startCase(id),
				value,
			})),
		},
	},
	requests_sent: {
		status_chart: {
			title  : 'Status',
			colors : ['#7bc4cc', '#337b84'],
			data   : [
				{
					id    : 'requested_feedback_request_count',
					label : 'Requests Created',
					value : stats.requested_feedback_request_count || 0,
				},
				{
					id    : 'total_responded_request_count',
					label : 'Responses Received',
					value : stats.total_responded_request_count || 0,
				},
			],
		},
		tat_chart: {
			title  : 'TAT',
			colors : ['#70bfc8', '#47adb8', '#37878f', '#276066'],
			data   : [
				{
					id    : 'tat_greater_than_seven_day',
					label : 'Greater than 7 Days',
					value : stats.tat_greater_than_seven_day || 0,
				},
				{
					id    : 'tat_three_to_seven_day',
					label : '3 to 7 Days',
					value : stats.tat_three_to_seven_day || 0,
				},
				{
					id    : 'tat_one_to_three_day',
					label : '1 to 3 Days',
					value : stats.tat_one_to_three_day || 0,
				},
				{
					id    : 'tat_less_than_equal_to_one_day',
					label : 'Less than a Day',
					value : stats.tat_less_than_equal_to_one_day || 0,
				},
			],
		},
	},
});

import { startCase } from '@cogoport/utils';

const DEFAULT_STATS_VALUE = 0;

export const getStatsData = ({ stats }) => {
	const {
		feedback_type_stats = {},
		feedback_sub_type_stats = {},
		requested_feedback_request_count = 0,
		total_responded_request_count = 0,
		tat_greater_than_seven_day = 0,
		tat_three_to_seven_day = 0,
		tat_one_to_three_day = 0,
		tat_less_than_equal_to_one_day = 0,
	} = stats;

	return {
		feedbacks_received: {
			feedback_type_chart: {
				title  : 'Feedback Type',
				colors : ['#c2e4e7', '#70bfc8', '#37878f', '#276066'],
				data   : Object.entries(feedback_type_stats).reduce((data, [key, value]) => {
					if (value > DEFAULT_STATS_VALUE) {
						return [...data, { id: key, label: startCase(key), value }];
					}
					return data;
				}, []),
			},
			feedback_sub_type_chart: {
				title  : 'Feedback Sub-type',
				colors : ['#c2e4e7', '#99d1d8', '#70bfc8', '#47adb8', '#37878f', '#276066'],
				data   : Object.entries(feedback_sub_type_stats).reduce((data, [key, value]) => {
					if (value > DEFAULT_STATS_VALUE) {
						return [...data, { id: key, label: startCase(key), value }];
					}
					return data;
				}, []),
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
						value : requested_feedback_request_count,
					},
					{
						id    : 'total_responded_request_count',
						label : 'Responses Received',
						value : total_responded_request_count,
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
						value : tat_greater_than_seven_day,
					},
					{
						id    : 'tat_three_to_seven_day',
						label : '3 to 7 Days',
						value : tat_three_to_seven_day,
					},
					{
						id    : 'tat_one_to_three_day',
						label : '1 to 3 Days',
						value : tat_one_to_three_day,
					},
					{
						id    : 'tat_less_than_equal_to_one_day',
						label : 'Less than a Day',
						value : tat_less_than_equal_to_one_day,
					},
				],
			},
		},
	};
};

import { startCase } from '@cogoport/utils';

function getStatsData(activeTab = '', stats = {}) {
	if (activeTab === 'feedbacks_received') {
		return (
			{
				feedback_type_chart: {
					title  : 'Feedback Type',
					colors : ['#7bc4cc', '#337b84'],
					data   : [
						{
							id    : 'address',
							label : 'Address',
							value : stats?.type?.address || 0,
						},
						{
							id    : 'user_information',
							label : 'User Information',
							value : stats?.type?.user_information || 0,
						},
					],
				},
				feedback_sub_type_chart: {
					title  : 'Feedback Sub-type',
					colors : ['#c2e4e7', '#99d1d8', '#70bfc8', '#47adb8', '#37878f', '#276066'],
					data   : Object.entries(stats?.sub_type || {}).map(([id, value]) => ({
						id,
						label: startCase(id),
						value,
					})),
				},
			}
		);
	}
	if (activeTab === 'requests_sent') {
		return (
			{
				status_chart: {
					title  : 'Status',
					colors : ['#7bc4cc', '#337b84'],
					data   : [
						{
							id    : 'response_received',
							label : 'Response Received',
							value : stats?.response_received || 0,
						},
						{
							id    : 'request_created',
							label : 'Request Created',
							value : stats?.request_created || 0,
						},
					],
				},
				tat_chart: {
					title  : 'TAT',
					colors : ['#7bc4cc', '#337b84'],
					data   : [
						{
							id    : 'response_received',
							label : 'Response Received',
							value : stats?.tat_response_received || 0,
						},
						{
							id    : 'request_created',
							label : 'Request Created',
							value : stats?.tat_request_created || 0,
						},
					],
				},
			}
		);
	}
	return null;
}

export default getStatsData;

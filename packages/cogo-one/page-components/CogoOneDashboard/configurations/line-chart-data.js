import { format, isEmpty } from '@cogoport/utils';

import { emptyChartData } from './empty-chart-data';

const FORMAT_TYPE = {
	day: {
		label: 'HH',
	},
	week: {
		label: 'dd',
	},
	month: {
		label: 'dd',
	},
};

const chartData = ({ cogoOneDashboardGraph = {}, timeline }) => {
	const data = isEmpty(cogoOneDashboardGraph)
		? emptyChartData[timeline]
		: cogoOneDashboardGraph;
	const { message_graph_data = {}, call_graph_data = {} }	= data || {};

	// console.log('message_ ::', message_graph_data);
	// console.log('message_ ::', call_graph_data);

	const messageChatKeys = Object.keys(message_graph_data);
	const callChatKeys = Object.keys(call_graph_data);

	// console.log('messageChatKeys ::', messageChatKeys);
	// console.log('callChatKeys ::', callChatKeys);

	const messageData = messageChatKeys.map((key) => {
		const dates = key.split(' to ');
		return {
			x : `${format(dates[0], FORMAT_TYPE[timeline]?.label)}-${format(dates[1], FORMAT_TYPE[timeline]?.label)}`,
			y : message_graph_data[key],
		};
	});
	const callData = callChatKeys.map((key) => {
		const dates = key.split(' to ');
		return {
			x : `${format(dates[0], FORMAT_TYPE[timeline]?.label)}-${format(dates[1], FORMAT_TYPE[timeline]?.label)}`,
			y : call_graph_data[key],
		};
	});

	return [
		{
			id   : 'on messages',
			data : messageData || [],
		},
		{
			id   : 'on calls',
			data : callData || [],
		},
	];
};

export default chartData;

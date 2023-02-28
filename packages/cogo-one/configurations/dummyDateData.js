// export const DateChartDummyData = [
// 	{
// 		id: 'on messages',

// 		data: [
// 			{
// 				x : '7-8 Am',
// 				y : 29,
// 			},
// 			{
// 				x : '8-9 Am',
// 				y : 21,
// 			},
// 			{
// 				x : '9-10 Am',
// 				y : 14,
// 			},
// 			{
// 				x : '10-11 Am',
// 				y : 9,
// 			},
// 			{
// 				x : '11-12 Am',
// 				y : 18,
// 			},
// 			{
// 				x : '12-1 Pm',
// 				y : 7,
// 			},
// 			{
// 				x : '1-2 Pm',
// 				y : 28,
// 			},
// 			{
// 				x : '2-3 PM',
// 				y : 31,
// 			},
// 			{
// 				x : '3-4 Pm',
// 				y : 39,
// 			},
// 			{
// 				x : '4-5 Pm',
// 				y : 23,
// 			},
// 			{
// 				x : '5-6 Pm',
// 				y : 40,
// 			},

// 		],
// 	},
// 	{
// 		id: 'on calls',

// 		data: [
// 			{
// 				x : '7-8 Am',
// 				y : 6,
// 			},
// 			{
// 				x : '8-9 Am',
// 				y : 19,
// 			},
// 			{
// 				x : '9-10 Am',
// 				y : 35,
// 			},
// 			{
// 				x : '10-11 Am',
// 				y : 40,
// 			},
// 			{
// 				x : '11-12 Am',
// 				y : 24,
// 			},
// 			{
// 				x : '12-1 Pm',
// 				y : 12,
// 			},
// 			{
// 				x : '1-2 Pm',
// 				y : 9,
// 			},
// 			{
// 				x : '2-3 PM',
// 				y : 34,
// 			},
// 			{
// 				x : '3-4 Pm',
// 				y : 39,
// 			},
// 			{
// 				x : '4-5 Pm',
// 				y : 11,
// 			},
// 			{
// 				x : '5-6 Pm',
// 				y : 13,
// 			},
// 		],
// 	},

// ];

const chartData = ({ cogoOneDashboardGraph = {} }) => {
	const { message_graph_data = {}, call_graph_data = {} } = cogoOneDashboardGraph || {};

	const messageChatKeys = Object.keys(message_graph_data);
	const callChatKeys = Object.keys(call_graph_data);

	const messageData = messageChatKeys.map((key) => ({ x: '7-8 Am', y: message_graph_data[key] }));
	const callData = callChatKeys.map((key) => ({ x: '1-8 Am', y: call_graph_data[key] }));

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

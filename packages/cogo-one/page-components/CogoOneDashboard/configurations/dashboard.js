export const chartData = ({ cogoOneDashboardGraph = {} }) => {
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

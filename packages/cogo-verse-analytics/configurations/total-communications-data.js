const PieChartData = ({ conversation_data = {} }) => [
	{
		id    : 'total',
		label : 'Total Communications',
		value : conversation_data?.total_communications || 0,
		color : '#BDBDBD',
	},
	{
		id    : 'system_initiated',
		label : 'System Initiated Conversations',
		value : conversation_data?.system_initiated_communications || 0,
		color : '#ABCD62',
	},
	{
		id    : 'customer_initiated',
		label : 'Customer Initiated Conversations',
		value : conversation_data?.customer_initiated_communications || 0,
		color : '#DDEBC0',
	},
];

export default PieChartData;

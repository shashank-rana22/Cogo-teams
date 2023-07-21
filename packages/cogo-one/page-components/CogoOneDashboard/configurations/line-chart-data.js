import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format, isEmpty } from '@cogoport/utils';

import { emptyChartData } from './empty-chart-data';

const DATE_INDEX = 1;

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

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const chartData = ({ cogoOneDashboardGraph = {}, timeline }) => {
	const data = isEmpty(cogoOneDashboardGraph)
		? emptyChartData[timeline]
		: cogoOneDashboardGraph;
	const { message_graph_data = {}, call_graph_data = {} }	= data || {};

	const messageChatKeys = Object.keys(message_graph_data);
	const callChatKeys = Object.keys(call_graph_data);

	function getDateValue(date) {
		return Number(format(date, FORMAT_TYPE[timeline]?.label));
	}

	const messageData = messageChatKeys.map((key, index) => {
		const dates = key.split(' to ');
		return {
			x: timeline === 'week'
				? daysOfWeek[index]
				: `${getDateValue(dates[GLOBAL_CONSTANTS.zeroth_index])}-${getDateValue(dates[DATE_INDEX])}`,
			y: message_graph_data[key],
		};
	});
	const callData = callChatKeys.map((key, index) => {
		const dates = key.split(' to ');
		return {
			x: timeline === 'week'
				? daysOfWeek[index]
				: `${getDateValue(dates[GLOBAL_CONSTANTS.zeroth_index])}-${getDateValue(dates[DATE_INDEX])}`,
			y: call_graph_data[key],
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

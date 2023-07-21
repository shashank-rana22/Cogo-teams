import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

const FORMAT_TYPE = {
	day: {
		label: GLOBAL_CONSTANTS.formats.time['hh aaa'],
	},
	week: {
		label: GLOBAL_CONSTANTS.formats.date['dd MMM'],
	},
	month: {
		label: GLOBAL_CONSTANTS.formats.date['dd MMM'],
	},
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const chartData = ({ graph = {}, timeline }) => {
	function getDateValue(date) {
		return format(date, FORMAT_TYPE[timeline]?.label);
	}

	const X_AXIS_LABEL_MAPPING = ({ start, end, index }) => ({
		day   : `${getDateValue(start)}-${getDateValue(end)}`,
		week  : daysOfWeek[index],
		month : `${getDateValue(start)}-${getDateValue(end)}`,
	});

	const messageData = (Object.keys(graph) || []).map((key, index) => {
		const [start, end] = JSON.parse(key);

		return {
			x : X_AXIS_LABEL_MAPPING({ start, end, index })[timeline],
			y : graph[key]?.msg_customers,
		};
	});

	const callData = (Object.keys(graph) || []).map((key, index) => {
		const [start, end] = JSON.parse(key);

		return {
			x : X_AXIS_LABEL_MAPPING({ start, end, index })[timeline],
			y : graph[key]?.call_customers,
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

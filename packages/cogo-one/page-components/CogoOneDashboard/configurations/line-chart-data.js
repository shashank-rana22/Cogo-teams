import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

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

const chartData = ({ graph = {}, timeline }) => {
	function getDateValue(date) {
		return formatDate({
			date,
			dateFormat : timeline !== 'day' ? FORMAT_TYPE[timeline]?.label : null,
			timeFormat : timeline === 'day' ? FORMAT_TYPE[timeline]?.label : null,
			formatType : timeline === 'day' ? 'time' : 'date',
			separator  : '/',
		});
	}

	const axisLabelMapping = ({ start, end, index }) => ({
		day   : `${getDateValue(start)}-${getDateValue(end)}`,
		week  : GLOBAL_CONSTANTS.days[index],
		month : `${getDateValue(start)}-${getDateValue(end)}`,
	});

	const messageData = (Object.keys(graph) || []).map((key, index) => {
		const [start, end] = JSON.parse(key);

		return {
			x : axisLabelMapping({ start, end, index })[timeline],
			y : graph[key]?.msg_customers,
		};
	});

	const callData = (Object.keys(graph) || []).map((key, index) => {
		const [start, end] = JSON.parse(key);

		return {
			x : axisLabelMapping({ start, end, index })[timeline],
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

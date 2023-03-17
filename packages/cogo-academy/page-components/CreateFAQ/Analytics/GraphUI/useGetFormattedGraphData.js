import { startCase, format } from '@cogoport/utils';

const MAPPING = {
	answers_available_data_points     : '#ABCD62',
	answers_not_available_data_points : '#E0E0E0',
	search_data_points                : '#EE3425',
};

const useGetFormattedGraphData = ({ graph_data = {} }) => {
	const graphData = [];

	Object.keys(graph_data || {}).forEach((key) => {
		const array = [];
		Object.keys(graph_data[key] || {}).forEach((timeKey) => {
			array.push({ x: format(timeKey, 'dd-MMM-yyyy'), y: graph_data[key][timeKey] });
		});

		array.sort((a, b) => new Date(a.x) - new Date(b.x));

		graphData.push({
			id    : startCase(key),
			key,
			color : MAPPING[key],
			data  : array,
		});
	});
	return { graphData };
};

export default useGetFormattedGraphData;

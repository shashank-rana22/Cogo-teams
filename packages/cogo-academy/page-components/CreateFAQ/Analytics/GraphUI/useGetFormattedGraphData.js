import { startCase, format } from '@cogoport/utils';

const MAPPING = {
	answers_available_data_points     : '#ABCD62',
	answers_not_available_data_points : '#E0E0E0',
	search_data_points                : '#EE3425',
};

const useGetFormattedGraphData = ({ graph_data = {} }) => {
	const { y_axis_parameter, ...restData } = graph_data || {};

	const graphData = [];

	Object.keys(restData || {}).forEach((key) => {
		const array = [];
		Object.keys(restData[key] || {}).forEach((timeKey) => {
			array.push({ x: format(timeKey, 'dd-MMM-yyyy'), y: restData[key][timeKey] });
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

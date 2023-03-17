import { startCase, format } from '@cogoport/utils';

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
			color : 'hsl(24, 70%, 50%)',
			data  : array,
		});
	});
	return { graphData };
};

export default useGetFormattedGraphData;

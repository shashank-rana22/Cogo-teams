import { format } from '@cogoport/utils';

const TOTAL_SEARCHES_MAPPING = {
	view_data_points: {
		color: '#2a9df4', title: 'View count',
	},
	answers_not_available_data_points: {
		color: '#a3a3a3', title: 'Answer not available',
	},
	answers_available_data_points: {
		color: '#ABCD62', title: 'Answer available',
	},
	search_data_points: {
		color: '#EE3425', title: 'Total searches',
	},

};

const TOKEN_DATA_MAPPING = {
	token_utilization_data_points: {
		color: '#2a9df4', title: 'Token utilization',
	},
};

const useGetFormattedGraphData = ({ graph_data = {}, source = '' }) => {
	const MAPPING = source === 'token_utilization' ? TOKEN_DATA_MAPPING : TOTAL_SEARCHES_MAPPING;

	const { abscissa, ...restData } = graph_data || {};

	const graphData = [];

	Object.keys(MAPPING || {}).forEach((key) => {
		const array = [];

		Object.keys(restData[key] || {}).forEach((timeKey) => {
			const x = abscissa === 'hour' ? timeKey : format(timeKey, 'dd-MMM-yyyy');
			array.push({ x, y: restData[key][timeKey] });
		});

		array.sort((a, b) => new Date(a.x) - new Date(b.x));

		graphData.push({
			id    : MAPPING[key].title,
			key,
			color : MAPPING[key].color,
			data  : array,
		});
	});

	return { graphData };
};

export default useGetFormattedGraphData;

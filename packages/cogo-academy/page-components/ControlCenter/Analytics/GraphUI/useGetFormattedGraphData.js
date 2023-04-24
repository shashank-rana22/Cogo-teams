import { startCase, format } from '@cogoport/utils';

const COLOR_MAPPING = {
	search_data_points                : '#EE3425',
	answers_available_data_points     : '#ABCD62',
	answers_not_available_data_points : '#a3a3a3',
	view_data_points                  : '#2a9df4',

};

const MAPPING = [
	'view_data_points',
	'answers_not_available_data_points',
	'answers_available_data_points',
	'search_data_points',
];

const useGetFormattedGraphData = ({ graph_data = {} }) => {
	const { abscissa, ...restData } = graph_data || {};

	const graphData = [];

	MAPPING.forEach((key) => {
		const array = [];

		Object.keys(restData[key] || {}).forEach((timeKey) => {
			const x = abscissa === 'hour' ? timeKey : format(timeKey, 'dd-MMM-yyyy');
			array.push({ x, y: restData[key][timeKey] });
		});

		array.sort((a, b) => new Date(a.x) - new Date(b.x));

		graphData.push({
			id    : startCase(key),
			key,
			color : COLOR_MAPPING[key],
			data  : array,
		});
	});

	return { graphData };
};

export default useGetFormattedGraphData;

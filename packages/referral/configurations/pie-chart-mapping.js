import getFormatedChartData from '../utils/getFormatedChartData';

const pieChartMapping = () => {
	const {
		allottedData = [],
		estimatedData = [],
	} = getFormatedChartData();

	const detailsPieChart = [
		{
			title       : 'Allotted',
			data        : allottedData,
			total_count : 200 || 0,
		},
		{
			title       : 'Estimated',
			data        : estimatedData,
			total_count : 300 || 0,
		},

	];

	return {
		detailsPieChart,
	};
};

export default pieChartMapping;

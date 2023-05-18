import getFormatedChartData from '../utils/getFormatedChartData';

const pieChartMapping = (
	alloted = {},

) => {
	const chartCount = () => {
		let totalCount = 0;
		Object.values(alloted).forEach((value) => {
			totalCount += value;
		});
		return totalCount;
	};

	const {
		allottedData = [],
	} = getFormatedChartData(
		alloted,
	);

	const detailsPieChart = [
		{
			title       : 'Allotted',
			data        : allottedData,
			total_count : chartCount(),
		},

	];

	return {
		detailsPieChart,
	};
};

export default pieChartMapping;

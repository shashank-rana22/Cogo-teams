import getFormatedChartData from '../utils/getFormatedChartData';
import { handleValues } from '../utils/handleValue';

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

	const totalAllotedCogoppoints = chartCount();

	const {
		allottedData = [],
	} = getFormatedChartData(
		alloted,
	);

	const detailsPieChart = [
		{
			title       : 'Allotted',
			data        : allottedData,
			total_count : handleValues(totalAllotedCogoppoints),
		},

	];

	return {
		detailsPieChart,
	};
};

export default pieChartMapping;

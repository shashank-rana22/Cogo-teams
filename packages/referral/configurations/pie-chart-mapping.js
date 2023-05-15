import getFormatedChartData from '../utils/getFormatedChartData';

const pieChartMapping = (
	alloted = {},
	estimated = {},
) => {
	const chartCount = ({ type = '' }) => {
		const checkType = type === 'allotted' ? alloted : estimated;
		let totalCount = 0;
		Object.values(checkType).forEach((value) => {
			totalCount += value;
		});
		return totalCount;
	};

	const {
		allottedData = [],
		estimatedData = [],
	} = getFormatedChartData(
		alloted,
		estimated,
	);

	const detailsPieChart = [
		{
			title       : 'Allotted',
			data        : allottedData,
			total_count : chartCount({ type: 'allotted' }),
		},
		{
			title       : 'Estimated',
			data        : estimatedData,
			total_count : chartCount({ type: 'estimated' }),
		},

	];

	return {
		detailsPieChart,
	};
};

export default pieChartMapping;

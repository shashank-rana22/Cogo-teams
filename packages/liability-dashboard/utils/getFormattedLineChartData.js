import { format } from '@cogoport/utils';

const getFormattedLineChartData = (data = {}) => {
	let chartDetails = [];

	const keys = Object.keys(data || {});

	keys.forEach((key) => {
		chartDetails = [
			...chartDetails,
			{
				x : format((key), 'MMMM'),
				y : Math.round(data[key]),
			},
		];
	});

	return chartDetails;
};

export default getFormattedLineChartData;

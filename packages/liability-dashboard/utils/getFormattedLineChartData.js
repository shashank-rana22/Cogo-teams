import { format } from '@cogoport/utils';

import { formatValue } from './formatValue';

const getFormattedLineChartData = (data = {}) => {
	let chartDetails = [];

	const keys = Object.keys(data || {});

	keys.forEach((key) => {
		chartDetails = [
			...chartDetails,
			{
				x : format((key), 'PPP').replace('1st,', ''),
				y : formatValue(data[key]),
			},
		];
	});

	return chartDetails;
};

export default getFormattedLineChartData;

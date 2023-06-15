import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const INDEX_VALUE = 0;
const getFormattedLineChartData = (data = {}) => {
	const newData = Object.keys(data || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : GLOBAL_CONSTANTS.formats.date['MMM yyyy'],
			formatType : 'date',
		}),
		y: data[item] || INDEX_VALUE,
	}));

	return newData;
};

export default getFormattedLineChartData;

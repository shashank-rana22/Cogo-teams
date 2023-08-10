import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';

const THRESHOLD_DAY = 31;
const INDEX_VALUE = 0;

const checkDateDifference = ({ endDate, startDate }) => {
	const differenceInDay = differenceInDays(endDate, startDate);

	const dateFormat = differenceInDay >= THRESHOLD_DAY
		? GLOBAL_CONSTANTS.formats.date['MMM yyyy'] : GLOBAL_CONSTANTS.formats.date['dd MMM'];

	return GLOBAL_CONSTANTS.formats.date[dateFormat];
};

const getFormattedLineChartData = ({ data = {}, selectedDate = {} }) => {
	const { startDate, endDate } = selectedDate || {};

	const newData = Object.keys(data || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : checkDateDifference({ endDate, startDate }),
			formatType : 'date',
		}),
		y: data[item] || INDEX_VALUE,
	}));

	return newData;
};

export default getFormattedLineChartData;

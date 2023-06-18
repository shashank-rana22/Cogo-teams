import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';

const THRESHOLD_DAYS = 31;
const INDEX_VALUE = 0;

const getFormattedLineChartData = ({ data = {}, selectedDate = {} }) => {
	const { startDate, endDate } = selectedDate || {};
	const checkDateDifference = (date2, date1) => {
		let dateTypeFormat = '';
		const differenceInDay = differenceInDays(date2, date1);

		if (differenceInDay >= THRESHOLD_DAYS) {
			dateTypeFormat = GLOBAL_CONSTANTS.formats.date['MMM yyyy'];
		} else if (differenceInDay < THRESHOLD_DAYS) {
			dateTypeFormat = GLOBAL_CONSTANTS.formats.date['dd MMM'];
		}
		return dateTypeFormat;
	};

	const newData = Object.keys(data || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : checkDateDifference(endDate, startDate),
			formatType : 'date',
		}),
		y: data[item] || INDEX_VALUE,
	}));

	return newData;
};

export default getFormattedLineChartData;

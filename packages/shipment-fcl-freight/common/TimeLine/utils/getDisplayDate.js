import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

export function getDisplayDate(props) {
	const {
		date,
		formatType = 'date',
		dateFormat = GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat = GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator = ' - ',
	} = props || {};

	return date && new Date(date).toDateString() !== 'Invalid Date' ? formatDate({
		date,
		dateFormat,
		formatType,
		...(formatType === 'dateTime' && { timeFormat }),
		separator,
	}) : null;
}

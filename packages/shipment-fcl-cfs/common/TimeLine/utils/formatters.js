import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export function getDate(date, dateFormat = 'dd MMM yyyy - hh:mm aaa') {
	return date ? formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date[dateFormat],
		formatType : 'date',
		separator  : ' - ',
	}) : null;
}

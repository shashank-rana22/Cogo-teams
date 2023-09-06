import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

function changeFormat({ time }) {
	return formatDate({
		date       : time,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});
}

export default changeFormat;

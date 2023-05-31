import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getFormattedDate = (date, dateformat = 'date') => {
	if (dateformat === 'dateTime') {
		return formatDate({
			date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'dateTime',
			separator  : '-',
		});
	}

	return formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});
};

export default getFormattedDate;

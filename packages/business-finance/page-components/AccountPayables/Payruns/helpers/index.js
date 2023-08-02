import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const dateFormatter = (date) => {
	if (!date || !date.startDate || !date.endDate) return {};
	const formatOptions = {
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	};

	const selectFromDate = formatDate({ date: date.startDate, ...formatOptions });
	const selectToDate = formatDate({ date: date.endDate, ...formatOptions });

	return { selectFromDate, selectToDate };
};

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const formattedDate = (date, dateFormat = GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date[dateFormat],
	formatType : 'date',
});

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const getFormatDate = (date) => formatDate(
	{ date, dateformat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], formatType: 'date' },
);

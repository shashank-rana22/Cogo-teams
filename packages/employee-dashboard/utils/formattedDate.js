import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const formattedDate = (item) => formatDate({
	date       : item,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getFormattedDate = ({ date }) => (
	formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
		formatType : 'date',
	}));

export default getFormattedDate;

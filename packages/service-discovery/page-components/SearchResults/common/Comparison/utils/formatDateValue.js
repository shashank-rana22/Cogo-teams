import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const formatDateValue = (date) => (
	formatDate({
		date,
		formattype : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	}) || '-'
);

export default formatDateValue;

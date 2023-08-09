import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

const formatDateTime = ({ date, dateformat }) => {
	const currentDate = new Date(date);

	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const userFormattedDateTime = currentDate.toLocaleString(GLOBAL_CONSTANTS.currency_locale.USD, {
		timeZone: userTimezone,
	});

	return format(userFormattedDateTime, dateformat);
};

export default formatDateTime;

import { format } from '@cogoport/utils';

const formatDateTime = ({ date, dateformat }) => {
	const currentDate = new Date(date);

	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const userFormattedDateTime = currentDate.toLocaleString('en-US', {
		timeZone: userTimezone,
	});

	return format(userFormattedDateTime, dateformat);
};

export default formatDateTime;

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const INDEX_OF_ZONE = 1;
const TOTAL_HOURS = 24;
const TOTAL_MINUTES = 60;
const DEFAULT_TIME = 0;
const HOURS_TO_CHANGE = 1;

export const getDateFromTime = ({
	timeStr = '00:00:00',
	timeZone = '+00:00',
}) => {
	const [hour = 0, minute = 0, seconds = 0] = timeStr.split(':');

	const GMTZone = timeZone.slice(GLOBAL_CONSTANTS.zeroth_index, INDEX_OF_ZONE);
	const timeDifference = timeZone.slice(INDEX_OF_ZONE);
	const [hourDifference, minuteDifference] = timeDifference.split(':');

	const formattedMinute = GMTZone === '+'
		? Number(minute) + Number(minuteDifference)
		: Number(minute) - Number(minuteDifference);

	const formattedHour = (
		(GMTZone === '+'
			? Number(hour) + Number(hourDifference)
			: Number(hour) - Number(hourDifference))
		+ Number(formattedMinute >= TOTAL_MINUTES ? HOURS_TO_CHANGE : DEFAULT_TIME)
		- (formattedMinute < DEFAULT_TIME ? HOURS_TO_CHANGE : DEFAULT_TIME)
	);

	const currentTime = new Date();

	currentTime.setHours(((formattedHour % TOTAL_HOURS) + TOTAL_HOURS) % TOTAL_HOURS);
	currentTime.setMinutes(((formattedMinute % TOTAL_MINUTES) + TOTAL_MINUTES) % TOTAL_MINUTES);
	currentTime.setSeconds(Number(seconds) || DEFAULT_TIME);

	return currentTime;
};

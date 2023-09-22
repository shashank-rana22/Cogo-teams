import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const NEGATIVE_INDEX = -1;

const formatTime = (time) => {
	if (!time) return null;

	const currentDate = new Date();

	const timeParts = time.split(':');
	const hours = +(timeParts[GLOBAL_CONSTANTS.zeroth_index]);
	const minutes = +(timeParts[GLOBAL_CONSTANTS.one]);

	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);

	return currentDate;
};

const parseScheduleString = (str = '') => {
	const strSplit = str?.split?.(' ') || [];

	const prevFrequency = strSplit[GLOBAL_CONSTANTS.zeroth_index] || '';
	let prevDay = '';

	let prevTime = strSplit.slice(NEGATIVE_INDEX)[GLOBAL_CONSTANTS.zeroth_index] || '';

	prevTime = formatTime(prevTime);

	if (prevFrequency === 'Weekly') prevDay = strSplit[GLOBAL_CONSTANTS.two] || '';

	return { prevFrequency: prevFrequency.toLowerCase(), prevDay: prevDay.toLowerCase(), prevTime };
};

export default parseScheduleString;

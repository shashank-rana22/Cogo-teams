const formatTime = (time) => {
	if (!time) return null;

	const currentDate = new Date();

	const timeParts = time.split(':');
	const hours = +(timeParts[0]);
	const minutes = +(timeParts[1]);

	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);

	return currentDate;
};

const parseScheduleString = (str = '') => {
	const strSplit = str?.split?.(' ') || [];

	const prevFrequency = strSplit[0] || '';
	let prevDay = '';

	let prevTime = strSplit.slice(-1)[0] || '';

	prevTime = formatTime(prevTime);

	if (prevFrequency === 'Weekly') prevDay = strSplit[2] || '';

	return { prevFrequency: prevFrequency.toLowerCase(), prevDay: prevDay.toLowerCase(), prevTime };
};

export default parseScheduleString;

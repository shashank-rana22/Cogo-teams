const DEFAULT_VALUE_FOR_RADIX_PARAMETER = 10;

const setDateHours = ({ time = '0:0:0', date }) => {
	const newDate = new Date(date);

	if (newDate.toDateString() === 'Invalid Date') {
		return null;
	}

	let [hour = 0, minute = 0, second = 0] = time.split(':');

	[hour, minute, second] = [hour, minute, second].map(
		(item) => parseInt(item, DEFAULT_VALUE_FOR_RADIX_PARAMETER),
	);

	if (Number.isNaN(hour) || Number.isNaN(minute) || Number.isNaN(second)) {
		return null;
	}

	newDate.setHours(hour, minute, second);
	return newDate;
};
export default setDateHours;

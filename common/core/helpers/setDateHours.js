const DEFAULT_VALUE_FOR_RADIX_PARAMETER = 10;

const setDateHours = ({ time = '0:0:0', date }) => {
	const newDate = new Date(date);

	if (newDate.toDateString() === 'Invalid Date') {
		return null;
	}

	let [getHour = 0, getMinute = 0, getSecond = 0] = time.split(':');

	getHour = parseInt(getHour, DEFAULT_VALUE_FOR_RADIX_PARAMETER);

	getMinute = parseInt(getMinute, DEFAULT_VALUE_FOR_RADIX_PARAMETER);

	getSecond = parseInt(getSecond, DEFAULT_VALUE_FOR_RADIX_PARAMETER);

	if (Number.isNaN(getHour) || Number.isNaN(getMinute) || Number.isNaN(getSecond)) {
		return null;
	}

	newDate.setHours(getHour, getMinute, getSecond);
	return newDate;
};
export default setDateHours;

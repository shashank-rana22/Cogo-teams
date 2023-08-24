const DEFAUT_ZERO_VALUE = 0;
const DEFAUT_ONE_VALUE = 1;
const MINUTES_IN_AN_HOUR = 60;

const convertMinutestoHours = (time = 0) => {
	if (!time) return DEFAUT_ZERO_VALUE;

	if (time >= MINUTES_IN_AN_HOUR) {
		const hours = Math.floor(time / MINUTES_IN_AN_HOUR);
		const minutes = time % MINUTES_IN_AN_HOUR;
		const hourStr = hours === DEFAUT_ONE_VALUE ? 'hour' : 'hours';
		const minuteStr = minutes === DEFAUT_ONE_VALUE ? 'minute' : 'minutes';
		if (minutes === DEFAUT_ZERO_VALUE) {
			return `${hours} ${hourStr} `;
		}
		return `${hours} ${hourStr} ${minutes} ${minuteStr}`;
	}
	const minuteStr = time === DEFAUT_ONE_VALUE ? 'minute' : 'minutes';
	return `${time} ${minuteStr}`;
};

export default convertMinutestoHours;

const DEFAULT_ZERO_VALUE = 0;
const DEFAULT_ONE_VALUE = 1;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;

const convertMinutesToHoursOrDays = (time = 0) => {
	if (!time) return `${DEFAULT_ZERO_VALUE} minutes`;

	let displayTime;

	if (time >= MINUTES_IN_AN_HOUR) {
		if (time >= MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY) {
			const days = Math.floor(time / (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY));
			const remainingHours = Math.floor((time % (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY)) / MINUTES_IN_AN_HOUR);
			displayTime = `${days} day${days === DEFAULT_ONE_VALUE ? '' : 's'} 
			${remainingHours} hour${remainingHours === DEFAULT_ONE_VALUE ? '' : 's'}`;
		} else {
			const hours = Math.floor(time / MINUTES_IN_AN_HOUR);
			const minutes = time % MINUTES_IN_AN_HOUR;
			const hourStr = hours === DEFAULT_ONE_VALUE ? 'hour' : 'hours';
			const minuteStr = minutes === DEFAULT_ONE_VALUE ? 'minute' : 'minutes';
			if (minutes === DEFAULT_ZERO_VALUE) {
				displayTime = `${hours} ${hourStr}`;
			} else {
				displayTime = `${hours} ${hourStr} ${minutes} ${minuteStr}`;
			}
		}
	} else {
		const minuteStr = time === DEFAULT_ONE_VALUE ? 'minute' : 'minutes';
		displayTime = `${time} ${minuteStr}`;
	}

	return displayTime;
};

export default convertMinutesToHoursOrDays;

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = HOURS_PER_DAY * MILLISECONDS_PER_HOUR;

const ONE = 1;

const handleTimer = (end_date) => {
	const timeNow = new Date().getTime();
	const countDownDate = new Date(end_date).getTime();

	const difference = Math.abs(countDownDate - timeNow);

	let days = Math.floor(difference / MILLISECONDS_PER_DAY);
	let hours = Math.floor((difference % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR) || '00';
	let minutes = Math.floor((difference % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE) || '00';
	let seconds = Math.floor((difference % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND) || '00';

	if (days) {
		days = `${days} ${days > ONE ? 'Days' : 'Day'}`;
	} else days = '';

	if (hours) {
		hours = `${hours} ${hours > ONE ? 'Hours' : 'Hour'}`;
	} else hours = '';

	if (minutes) {
		minutes = `${minutes} ${minutes > ONE ? 'Minutes' : 'Minute'}`;
	} else minutes = '';

	if (seconds) {
		seconds = `${seconds} ${seconds > ONE ? 'Seconds' : 'Second'}`;
	} else seconds = '';

	return `${days}${' '}${hours}${' '}${minutes}${' '}${seconds}`;
};

export default handleTimer;

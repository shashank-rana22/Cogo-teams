const handleTimer = (end_date) => {
	const timeNow = new Date().getTime();
	const countDownDate = new Date(end_date).getTime();

	const difference = Math.abs(countDownDate - timeNow);

	let days = Math.floor(difference / (1000 * 60 * 60 * 24));
	let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || '00';
	let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) || '00';
	let seconds = Math.floor((difference % (1000 * 60)) / 1000) || '00';

	if (days) {
		days = `${days} ${days > 1 ? 'Days' : 'Day'}`;
	} else days = '';

	if (hours) {
		hours = `${hours} ${hours > 1 ? 'Hours' : 'Hour'}`;
	} else hours = '';

	if (minutes) {
		minutes = `${minutes} ${minutes > 1 ? 'Minutes' : 'Minute'}`;
	} else minutes = '';

	if (seconds) {
		seconds = `${seconds} ${seconds > 1 ? 'Seconds' : 'Second'}`;
	} else seconds = '';

	return `${days}${' '}${hours}${' '}${minutes}${' '}${seconds}`;
};

export default handleTimer;

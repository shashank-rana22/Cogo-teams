const handleTimer = (end_date) => {
	const timeNow = new Date().getTime();
	const countDownDate = new Date(end_date).getTime();

	const difference = Math.abs(countDownDate - timeNow);

	let days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours =		Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || '00';
	const minutes =		Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) || '00';
	const seconds = Math.floor((difference % (1000 * 60)) / 1000) || '00';

	if (days) {
		days = `${days} ${days > 1 ? 'Days' : 'Day'}`;
	} else days = '';

	return `${days}${' '}${hours}:${minutes}:${seconds} ${
		hours > 1 ? 'Hrs' : 'Hr'
	}`;
};

export default handleTimer;

const handleTimer = (kycSubmittedTime) => {
	const timeNow = new Date().getTime();
	let difference = timeNow - '1678858892495';

	if (difference < 30 * 60000) {
		difference = 30 * 60000 - difference;
	}

	let hours = Math.floor(
		(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((difference % (1000 * 60)) / 1000);

	console.log(seconds, 'seconds');

	if (hours) {
		hours = `${hours}${'h '}`;
	} else hours = '';

	if (minutes < 60) {
		minutes = `${minutes}${'m '}`;
	} else minutes = '';

	if (seconds < 60) {
		seconds = `${seconds}${'s '}`;
	} else seconds = '';

	if (difference < 30 * 60000) {
		return `${hours}${minutes}${seconds}`;
	}

	return `${hours}${minutes}${seconds}`;
};

export default handleTimer;

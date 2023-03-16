const handleTimer = (testStartedAt = '1678887248100', duration = 60) => {
	const timeNow = new Date().getTime();
	let difference = timeNow - testStartedAt;

	if (difference < duration * 60000) {
		difference = duration * 60000 - difference;
	}

	let hours = Math.floor(
		(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((difference % (1000 * 60)) / 1000);

	if (hours) {
		hours = `${hours}${'h '}`;
	} else hours = '';

	if (minutes < 60) {
		minutes = `${minutes}${'m '}`;
	} else minutes = '';

	if (seconds < 60) {
		seconds = `${seconds}${'s '}`;
	} else seconds = '';

	if (difference < duration * 60000) {
		return `${hours}${minutes}${seconds}`;
	}

	return `${hours}${minutes}${seconds}`;
};

export default handleTimer;

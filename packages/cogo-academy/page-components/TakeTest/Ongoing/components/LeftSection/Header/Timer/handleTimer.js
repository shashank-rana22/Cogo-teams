// import handleMinimizeTest from '../../../../../utils/handleMinimizeTest';

const handleTimer = (test_start_time, duration, setShowTimeOverModal) => {
	const timeNow = new Date().getTime();

	let difference = timeNow - test_start_time;

	if (difference < duration * 60000) {
		difference = duration * 60000 - difference;
	}

	const check = difference < 1000 || difference > duration * 60000;
	if (check) 	{
		// handleMinimizeTest();
		setShowTimeOverModal(true);
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

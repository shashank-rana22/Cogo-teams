const MINUTES = 3600;
const HOURS = 24;
const SECONDS = 60;

const getFormattedTime = (totalSeconds) => {
	const days = Math.floor(totalSeconds / (MINUTES * HOURS));
	const hours = Math.floor((totalSeconds % (MINUTES * HOURS)) / MINUTES);
	const minutes = Math.floor((totalSeconds % MINUTES) / SECONDS);
	const seconds = Math.floor(totalSeconds % SECONDS);

	const time = { days, hours, minutes, seconds };

	return { time };
};

export default getFormattedTime;

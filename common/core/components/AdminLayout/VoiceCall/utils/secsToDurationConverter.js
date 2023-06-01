const secsToDurationConverter = (status, counter) => {
	if (!status) {
		return '';
	}
	const hours = Math.floor(counter / 3600);
	const minutes = Math.floor((counter % 3600) / 60);
	const remainingSeconds = counter % 60;

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

	return `${hours ? `${formattedHours}:` : ''}${formattedMinutes}:${formattedSeconds}`;
};
export default secsToDurationConverter;

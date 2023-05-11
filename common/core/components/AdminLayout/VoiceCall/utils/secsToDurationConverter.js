const secsToDurationConverter = (status, counter) => {
	if (!status) {
		return '';
	}
	let time = '';
	const secs = counter % 60;
	const minute = Math.trunc(counter / 60) % 60;
	const hour = Math.trunc(Math.trunc(counter / 60) / 60) % 60;

	if (hour > 0) {
		time = `${hour} hour ${minute} min ${secs} sec`;
	} else if (minute > 0) {
		time = `${minute} min ${secs} sec`;
	} else if (secs > 0) {
		time = `${secs} sec`;
	}
	return time;
};
export default secsToDurationConverter;

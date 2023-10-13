function getReadableDateDifference({ start, end }) {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const timeDifference = endDate - startDate;

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return years + (years === 1 ? ' year' : ' years');
	} if (months > 0) {
		return months + (months === 1 ? ' month' : ' months');
	} if (days > 0) {
		return days + (days === 1 ? ' day' : ' days');
	} if (hours > 0) {
		return hours + (hours === 1 ? ' hr' : ' hrs');
	} if (minutes > 0) {
		return minutes + (minutes === 1 ? ' min' : ' mins');
	}
	return seconds + (seconds === 1 ? ' sec' : ' secs');
}

export default getReadableDateDifference;

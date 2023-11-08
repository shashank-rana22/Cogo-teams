// adding 5:30 hr to match UTC time to IST
const fiveHrInMilli = 5.5 * 60 * 60 * 1000;

const getFormattedDate = ({ currentDate = '' }) => {
	const date = (typeof currentDate === 'string' ? new Date() : currentDate);

	const originalDate = new Date(date);

	originalDate.setTime(originalDate.getTime() + fiveHrInMilli);

	return originalDate;
};
export default getFormattedDate;

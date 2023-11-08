const sixHrInMilli = 6 * 60 * 60 * 1000;

const getFormattedDate = ({ currentDate = '' }) => {
	const date = (typeof currentDate === 'string' ? new Date() : currentDate);

	const originalDate = new Date(date);

	originalDate.setTime(originalDate.getTime() + sixHrInMilli);

	return originalDate;
};
export default getFormattedDate;

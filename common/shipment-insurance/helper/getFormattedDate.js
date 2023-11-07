const getFormattedDate = ({ currentDate = '' }) => {
	const date = (typeof currentDate === 'string' ? new Date() : currentDate);

	const originalDate = new Date(date);

	originalDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

	const newDate = originalDate.toISOString();

	return newDate;
};
export default getFormattedDate;

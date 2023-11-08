const getFormattedDate = ({ currentDate = '' }) => {
	const date = (typeof currentDate === 'string' ? new Date() : currentDate);

	const originalDate = new Date(date);

	originalDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

	return originalDate;
};
export default getFormattedDate;

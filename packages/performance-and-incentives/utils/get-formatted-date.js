const getFormattedDate = ({ currentDate = '' }) => {
	const originalDate = new Date(currentDate);

	originalDate.setDate(originalDate.getDate() + 1);

	const newDate = originalDate.toISOString();

	return newDate;
};

export default getFormattedDate;

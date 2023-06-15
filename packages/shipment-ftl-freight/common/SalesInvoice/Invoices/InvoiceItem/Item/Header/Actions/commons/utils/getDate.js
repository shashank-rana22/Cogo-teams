const getDate = (date) => {
	const tempDate = new Date(date);

	if (date && tempDate.toDateString() !== 'Invalid Date') {
		return tempDate;
	}
	return null;
};

export default getDate;
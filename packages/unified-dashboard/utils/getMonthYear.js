const getMonthYear = () => {
	const date = new Date();
	const getMonth = date.toLocaleString('default', { month: 'long' });
	const getYear = `${date.getFullYear()}`;

	return {
		getMonth,
		getYear,
	};
};

export default getMonthYear;

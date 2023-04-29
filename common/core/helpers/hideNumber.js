const hideNumber = (data = '') => {
	const finalString = `${data.substring(0, 2)}****${data.substring(
		data.length - 2,
		data.length,
	)}`;

	return finalString;
};

export default hideNumber;

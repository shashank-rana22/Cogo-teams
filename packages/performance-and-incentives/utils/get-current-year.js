const getCurrentYear = () => {
	const currentYear = (new Date()).getFullYear();

	return { currentYear };
};

export default getCurrentYear;

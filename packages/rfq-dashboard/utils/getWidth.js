const getWidth = (span = 1) => {
	const width = ((span * 100) / 12).toFixed(1);

	return `${width}%`;
};

export default getWidth;

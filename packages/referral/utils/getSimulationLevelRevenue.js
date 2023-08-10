const getSimulationLevelRevenue = (str = '') => {
	const num = parseFloat(str);
	let value;
	if (str.endsWith('K')) {
		value = num * 1000;
	} else if (str.endsWith('M')) {
		value = num * 1000000;
	} else if (str.endsWith('B')) {
		value = num * 1000000000;
	} else if (str.endsWith('T')) {
		value = num * 1000000000000;
	}
	return value;
};

export default getSimulationLevelRevenue;

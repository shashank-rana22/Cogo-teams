const EqualArray = (array1, array2) => {
	if (array1.length !== array2.length) {
		return false;
	}

	const ADDING_VALUE = 1;
	const sortedArray1 = array1.sort();
	const sortedArray2 = array2.sort();

	for (let i = 0; i < array1.length; i += ADDING_VALUE) {
		if (sortedArray1[i] !== sortedArray2[i]) {
			return false;
		}
	}

	return true;
};

export default EqualArray;

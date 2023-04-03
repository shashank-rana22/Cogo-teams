const getAlphabets = (start, end) => {
	const finalArray = [];

	const startCharCode = start.charCodeAt(0);
	const endCharCode = end.charCodeAt(0);

	for (let curr = startCharCode; curr <= endCharCode; curr += 1) {
		finalArray.push(String.fromCharCode(curr));
	}
	return finalArray;
};

export default getAlphabets;

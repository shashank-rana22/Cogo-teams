const findCommonInArrays = (arr1, arr2) => {
	const setA = new Set(arr1);
	const setB = new Set(arr2);
	const intersection = new Set([...setA].filter((item) => setB.has(item)));
	return Array.from(intersection);
};

export default findCommonInArrays;

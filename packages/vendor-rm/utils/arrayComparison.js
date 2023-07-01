const compareArrays = (a, b) => (
	a?.length === b?.length && a.sort().every((value, index) => value === b.sort()[index])
);

export default compareArrays;

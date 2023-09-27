function flattenArray(arr) {
	return arr.reduce(
		(flat, toFlatten) => flat.concat(
			Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten,
		),
		[],
	);
}
export default flattenArray;

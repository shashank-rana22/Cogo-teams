function isEqual(a, b) {
	// handle type
	if (typeof a !== typeof b) return false;

	// handle array
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;

		return a.every((item1, index) => isEqual(item1, b[index]));
	}

	// handle object
	if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);

		if (keysA.length !== keysB.length) return false;

		return keysA.every((key) => isEqual(a[key], b[key]));
	}

	// handle string, number, bool
	if (a === b) return true;

	return false;
}

export default isEqual;

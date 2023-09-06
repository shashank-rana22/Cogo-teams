function isEqual(a, b) {
	// handle string, number, bool
	if (a === b) return true;

	// handle type
	if (typeof a !== typeof b) return false;

	// handle array
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;

		let isArrayEqual = true;
		a.forEach((item1, index) => {
			if (!isEqual(item1, b[index])) {
				isArrayEqual = false;
			}
		});

		return isArrayEqual;
	}

	// handle object
	if (typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);

		if (keysA.length !== keysB.length) return false;

		return keysA.every((key) => isEqual(a[key], b[key]));
	}

	return false;
}

export default isEqual;

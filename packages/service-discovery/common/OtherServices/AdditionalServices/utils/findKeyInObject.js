function findKey(obj, targetKey) {
	if (obj[targetKey] !== undefined) {
		return obj[targetKey];
	}

	const keys = Object.keys(obj);
	let result;

	keys.forEach((key) => {
		if (!result && typeof obj[key] === 'object' && obj[key] !== null) {
			if (Array.isArray(obj[key])) {
				obj[key].forEach((item) => {
					if (!result && typeof item === 'object' && item !== null) {
						result = findKey(item, targetKey);
					}
				});
			} else {
				result = findKey(obj[key], targetKey);
			}
		}
	});

	return result;
}

export default findKey;

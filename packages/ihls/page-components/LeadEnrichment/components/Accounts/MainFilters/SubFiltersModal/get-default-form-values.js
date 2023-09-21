function getDefaultFormValues(filter) {
	const DEFAULT_VALUES = {};

	Object.keys(filter).forEach((key) => {
		if (typeof filter[key] === 'object' && !Array.isArray(filter[key])) {
			const nestedObj = getDefaultFormValues(filter[key]);
			Object.keys(nestedObj).forEach((nestedKey) => {
				DEFAULT_VALUES[nestedKey] = nestedObj[nestedKey];
			});
		} else {
			DEFAULT_VALUES[key] = filter[key];
			if (typeof filter[key] === 'boolean') {
				DEFAULT_VALUES[key] = filter[key].toString();
			}
		}
	});

	return DEFAULT_VALUES;
}

export default getDefaultFormValues;

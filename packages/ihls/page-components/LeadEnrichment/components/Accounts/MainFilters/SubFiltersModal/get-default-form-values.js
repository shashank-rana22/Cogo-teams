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
			} else if (Array.isArray(filter[key])) {
				DEFAULT_VALUES[key] = (filter[key] || []).map((item) => {
					if (item === true) return 'true';
					if (item === false) return 'false';
					if (item === null) return 'null';
					return item;
				});
			}
		}
	});

	return DEFAULT_VALUES;
}

export default getDefaultFormValues;

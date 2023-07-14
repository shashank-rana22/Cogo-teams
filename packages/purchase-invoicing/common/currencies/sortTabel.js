const sortTable = (data, field) => {
	const labelKey = field.key;
	const typeOfLabel = (item) => {
		if (typeof item[labelKey] === 'string' || typeof item.label === 'string') {
			return 'string';
		}
		if (typeof item[labelKey] === 'number' || typeof item.label === 'number') {
			return 'number';
		}
		return null;
	};

	if (data?.length > 1) {
		const sortedData = data.sort((a, b) => {
			if (typeOfLabel(a) === 'string' && typeOfLabel(b) === 'string') {
				return a[labelKey].localeCompare(b[labelKey]);
			}
			if (typeOfLabel(a) === 'number' && typeOfLabel(b) === 'number') {
				return a[labelKey] - b[labelKey];
			}
			throw new Error('column value can only be string or number.');
		});
		return sortedData;
	}
	return data;
};

export default sortTable;

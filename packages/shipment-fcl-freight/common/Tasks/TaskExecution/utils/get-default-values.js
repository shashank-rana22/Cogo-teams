const getDefaultValues = (oldfields) => {
	const defaultValues = {};
	oldfields.forEach((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			const childDeafultValues = {};
			field.controls.forEach((ctrl) => {
				childDeafultValues[ctrl.name] = defaultValues[ctrl.name];
			});
			defaultValues[field.name] = value || childDeafultValues;
		} else {
			defaultValues[field.name] = value || '';
		}
		return rest;
	});
	return defaultValues;
};

export default getDefaultValues;

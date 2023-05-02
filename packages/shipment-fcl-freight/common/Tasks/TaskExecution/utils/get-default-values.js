const getDefaultValues = (oldfields) => {
	const defaultValues = {};

	oldfields?.forEach((field) => {
		const { value, type = '', name = '', controls = [], ...rest } = field;

		if (type === 'fieldArray') {
			const childDeafultValues = {};

			controls?.forEach((ctrl) => {
				childDeafultValues[ctrl?.name] = defaultValues?.[ctrl?.name];
			});

			defaultValues[name] = value || childDeafultValues;
		} else {
			defaultValues[name] = value || '';
		}

		return rest;
	});

	return defaultValues;
};

export default getDefaultValues;

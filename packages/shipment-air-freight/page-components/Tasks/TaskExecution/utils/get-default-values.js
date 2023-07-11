const getDefaultValues = (oldfields) => {
	const DEFAULT_VALUES = {};
	oldfields?.forEach((field) => {
		const { value, type = '', name = '', controls = [], ...rest } = field;

		if (type === 'fieldArray') {
			const CHILD_DEFAULT_VALUES = {};

			controls?.forEach((ctrl) => {
				CHILD_DEFAULT_VALUES[ctrl?.name] = DEFAULT_VALUES?.[ctrl?.name];
			});

			DEFAULT_VALUES[name] = value || CHILD_DEFAULT_VALUES;
		} else {
			DEFAULT_VALUES[name] = value || '';
		}

		return rest;
	});

	return DEFAULT_VALUES;
};

export default getDefaultValues;

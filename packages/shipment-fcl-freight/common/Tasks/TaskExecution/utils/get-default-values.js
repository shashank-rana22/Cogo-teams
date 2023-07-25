const getDefaultValues = (oldFields) => {
	const DEFAULT_VALUES = {};

	oldFields?.forEach((field) => {
		const { value, type = '', name = '', controls = [] } = field;

		if (type === 'fieldArray') {
			const CHILD_DEFAULT_VALUES = {};

			controls?.forEach((ctrl) => {
				CHILD_DEFAULT_VALUES[ctrl?.name] = DEFAULT_VALUES?.[ctrl?.name];
			});

			const shouldShow = controls?.some?.(({ show = true } = {}) => show);

			if (shouldShow) {
				DEFAULT_VALUES[name] = value || CHILD_DEFAULT_VALUES;
			}
		} else {
			DEFAULT_VALUES[name] = value || '';
		}
	});

	return DEFAULT_VALUES;
};

export default getDefaultValues;

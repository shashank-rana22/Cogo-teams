const getFunction = {
	condition: (field, formValues) => (formValues?.condition || []).includes(field?.condition?.condition),
};

const getShowElement = (field, formValues) => {
	let flag = true;

	if (field?.type === 'fieldArray') {
		const showElements = [];

		for (let i = 0; i < formValues?.[field?.name]?.length; i += 1) {
			showElements.push({});
		}

		return showElements;
	}

	if ('show' in field) return field.show;

	const { show_conditions: condition } = field;

	Object.keys(condition || {}).forEach((conditionName) => {
		flag = flag && (getFunction?.[conditionName] || (() => true))(field, formValues);
	});

	return flag;
};

const getShowTaskFields = (formValues, controls = []) => {
	const showElements = {};

	controls.forEach((ctrl) => { showElements[ctrl?.name] = getShowElement(ctrl, formValues); });

	return showElements;
};

export default getShowTaskFields;

const getFunction = {
	type: (control, formValues) => control?.condition?.type.includes(formValues?.type),
};

const getShowElement = (control, formValues) => {
	let flag = true;

	const { condition } = control;

	Object.keys(condition || {}).forEach((conditionName) => {
		flag =			flag && (getFunction[conditionName] || (() => true))(control, formValues);
	});

	return flag;
};

export default getShowElement;

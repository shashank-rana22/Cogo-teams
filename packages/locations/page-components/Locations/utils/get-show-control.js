const getFunction = {
	type: (condition, formValues) => condition?.type?.includes(formValues?.type),
};

const getShowElement = ({ controls = [], formValues = {} }) => {
	const showElements = controls.reduce((pv, cv) => {
		const { name = '', condition } = cv || {};

		let flag = true;

		Object.keys(condition || {}).forEach((conditionName) => {
			flag =			flag && (getFunction[conditionName] || (() => true))(condition, formValues);
		});

		return { ...pv, [name]: flag };
	}, {});
	return showElements;
};

export default getShowElement;

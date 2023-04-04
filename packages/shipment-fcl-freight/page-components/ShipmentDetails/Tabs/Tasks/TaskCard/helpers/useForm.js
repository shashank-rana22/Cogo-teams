const reactHookForm = require('react-hook-form');

const getDefaultValues = (controls) => {
	const values = {};
	const newControls = controls.map((control) => {
		const { value, ...rest } = control;
		if (control.type === 'fieldArray') {
			values[control.name] = value || [];
		} else {
			values[control.name] = value || '';
		}
		return rest;
	});
	return { controls: newControls, values };
};

const useForm = (oldControls) => {
	const { controls, values } = getDefaultValues(oldControls);
	const { register, getValues, control, setValue, ...rest } = reactHookForm.useForm({ defaultValues: values });
	const fields = {};
	controls.forEach((controlItem) => {
		const { watch = true } = controlItem;
		if (watch || controlItem.type === 'fieldArray') {
			fields[controlItem.name] = { ...controlItem, control, register };
		} else {
			const registerValues = register(controlItem.name, { ...(controlItem.rules || {}) });
			const field = { ...controlItem, ...registerValues };
			fields[controlItem.name] = field;
		}
	});

	const setValues = (valObject = {}) => {
		Object.keys(valObject).forEach((key) => {
			setValue(key, valObject?.[key]);
		});
	};

	return { ...rest, fields, getValues, control, register, setValues, setValue };
};

module.exports = useForm;

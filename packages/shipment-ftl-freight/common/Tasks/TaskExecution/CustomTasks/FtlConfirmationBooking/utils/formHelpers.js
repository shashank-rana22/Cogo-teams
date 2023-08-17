const DEFAULT_VALUE = 0;

export const generateDefaultValues = ({ values = [] }) => {
	const INITIAL_STATE = {};
	const FIELD_VALUE = {};
	const DEFAULT_VALUES = {};
	values.forEach((control) => {
		if (control.type === 'edit_service_charges') {
			DEFAULT_VALUES[control.name] = control.value.map((value) => {
				control.controls.forEach((subControl) => {
					FIELD_VALUE[subControl.name] = value[subControl.name] || INITIAL_STATE;
				});

				return FIELD_VALUE;
			});
		}
	});

	return DEFAULT_VALUES;
};

export const prepareFormValues = (formValues) => {
	const allFormValues = { ...formValues };
	(Object.keys(formValues) || []).forEach((key) => {
		if (key && formValues[key]) {
			allFormValues[key] = (allFormValues[key] || []).map((value) => ({
				...value,
				total: (value.price || DEFAULT_VALUE) * (value.quantity || DEFAULT_VALUE),
			}));
		}
	});

	return allFormValues;
};

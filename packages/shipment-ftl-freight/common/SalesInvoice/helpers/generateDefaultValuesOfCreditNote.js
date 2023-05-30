const generateDefaultValues = ({ values }) => {
	const defaultValues = {};

	values.forEach((control) => {
		if (control.type === 'edit_service_charges') {
			defaultValues[control.name] = control.value.map((value) => {
				const fieldValue = {};

				control.controls.forEach((subControl) => {
					fieldValue[subControl.name] = value[subControl.name] || '';
				});

				return fieldValue;
			});
		}
	});

	return defaultValues;
};
export default generateDefaultValues;

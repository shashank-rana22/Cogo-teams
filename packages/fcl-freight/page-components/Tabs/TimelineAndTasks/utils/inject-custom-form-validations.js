const injectCustomFormValidations = (controls = []) => {
	const newControls = controls;
	newControls.forEach((control, index) => {
		if (control?.rules?.validation === 'empty_space') {
			newControls[index].rules.validate = (value) => {
				return value && value?.trim()?.length === 0
					? 'Cannot be Empty Spaced'
					: true;
			};
		}
	});
	return newControls;
};

export default injectCustomFormValidations;

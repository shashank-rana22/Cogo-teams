function getDate(date) {
	const tempDate = new Date(date);

	if (date && tempDate.toDateString() !== 'Invalid Date') {
		return tempDate;
	}
	return null;
}

const injectCustomFormValidations = (controls = []) => {
	const newControls = controls;

	newControls?.forEach((control, index) => {
		if (control?.rules?.validation === 'empty_space') {
			newControls[index].rules.validate = (value) => (value && value?.trim()?.length === 0
				? 'Cannot be Empty Spaced'
				: true);
		}
	});

	newControls?.forEach((control, index) => {
		if (control?.name?.includes('_date') && typeof control?.value === 'string') {
			newControls[index].value = getDate(newControls[index].value);
		}
	});

	return newControls;
};

export default injectCustomFormValidations;

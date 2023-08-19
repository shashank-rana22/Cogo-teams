import { isEmpty } from '@cogoport/utils';

const validateFileField = (value, control) => {
	if (typeof value === 'string' && !isEmpty(value)) {
		return true;
	}
	if (isEmpty(value?.finalUrl)) {
		return control.rules?.required?.message || control.rules?.required || 'This field is required';
	}
	return true;
};

const injectCustomFormValidations = (controls = []) => {
	const newControls = controls;

	newControls?.forEach((control, index) => {
		if (control?.rules?.validation === 'empty_space') {
			newControls[index].rules.validate = (value) => (value && isEmpty(value?.trim())
				? 'Cannot be Empty Spaced'
				: true);
		}

		if (control?.rules?.required && control?.type === 'file') {
			newControls[index].rules.validate = (value) => validateFileField(value, control);
		}

		if (control?.type === 'fieldArray') {
			control?.controls?.forEach((item, idx) => {
				if (item?.rules?.required && item?.type === 'file') {
					newControls[index].controls[idx].rules.validate = (value) => validateFileField(value, item);
				}
			});
		}
	});

	return newControls;
};

export default injectCustomFormValidations;

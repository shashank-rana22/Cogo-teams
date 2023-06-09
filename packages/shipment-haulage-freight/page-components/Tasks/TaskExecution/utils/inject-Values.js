import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = ({
	selectedMail,
	populatedControls,
	task = {},
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (task.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control?.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length ? controls[index]?.value
					: [{ url: selectedMail?.formatted?.[0]?.url }];
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;

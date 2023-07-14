import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = ({
	selectedMail,
	populatedControls,
	task,
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (task?.task === 'upload_si') {
		controls[GLOBAL_CONSTANTS.zeroth_index].value = [
			{
				url         : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
				description : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.description,
				si_filed_at : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.si_filed_at,
			},
		];
	} else if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;

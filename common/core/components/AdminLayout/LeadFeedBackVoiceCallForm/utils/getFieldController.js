import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
	CheckboxGroupController,
	RadioGroupController,
	CheckboxController,
	withControl,
	MobileNumberController,
} from '@cogoport/forms';

// eslint-disable-next-line import/no-cycle
import FieldArrayController from '../common/Form/FieldArray';

const CONTROLLER_MAPPING = {
	input              : InputController,
	select             : SelectController,
	datePicker         : DatepickerController,
	fileUpload         : UploadController,
	textarea           : TextAreaController,
	asyncSelect        : AsyncSelectController,
	radio              : RadioGroupController,
	checkboxGroup      : CheckboxGroupController,
	textArea           : TextAreaController,
	checkbox           : CheckboxController,
	withControl,
	fieldArray         : FieldArrayController,
	mobileNumberSelect : MobileNumberController,
};

export const getFieldController = ({ controlType = 'text', Component }) => {
	if (controlType === 'withControl') {
		if (!Component) {
			return null;
		}

		return withControl(Component);
	}

	return CONTROLLER_MAPPING[controlType] || null;
};

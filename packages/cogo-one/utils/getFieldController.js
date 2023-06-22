import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input       : InputController,
	select      : SelectController,
	datePicker  : DatepickerController,
	fileUpload  : UploadController,
	textarea    : TextAreaController,
	asyncSelect : AsyncSelectController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

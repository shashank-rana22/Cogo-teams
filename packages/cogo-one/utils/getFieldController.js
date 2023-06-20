import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input      : InputController,
	select     : SelectController,
	datePicker : DatepickerController,
	fileUpload : UploadController,
	textarea   : TextAreaController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

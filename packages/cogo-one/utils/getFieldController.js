import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
} from '@cogoport/forms';

// eslint-disable-next-line import/no-cycle
import FieldArrayController from './FieldArray';

const CONTROLLER_MAPPING = {
	input       : InputController,
	select      : SelectController,
	datePicker  : DatepickerController,
	fileUpload  : UploadController,
	textarea    : TextAreaController,
	asyncSelect : AsyncSelectController,
	fieldArray  : FieldArrayController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

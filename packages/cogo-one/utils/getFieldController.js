/* eslint-disable import/no-cycle */
import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
} from '@cogoport/forms';

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

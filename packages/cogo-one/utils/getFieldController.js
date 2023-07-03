/* eslint-disable import/no-cycle */
import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
	CheckboxGroupController,
	RadioGroupController,
} from '@cogoport/forms';

import FieldArrayController from './FieldArray';

const CONTROLLER_MAPPING = {
	input         : InputController,
	select        : SelectController,
	datePicker    : DatepickerController,
	fileUpload    : UploadController,
	textarea      : TextAreaController,
	asyncSelect   : AsyncSelectController,
	fieldArray    : FieldArrayController,
	radio         : RadioGroupController,
	checkboxGroup : CheckboxGroupController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

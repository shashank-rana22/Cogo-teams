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
	CheckboxController,
	CreatableMultiSelectController,
} from '@cogoport/forms';

import FieldArrayController from './FieldArray';

const CONTROLLER_MAPPING = {
	input              : InputController,
	select             : SelectController,
	datePicker         : DatepickerController,
	fileUpload         : UploadController,
	textarea           : TextAreaController,
	asyncSelect        : AsyncSelectController,
	fieldArray         : FieldArrayController,
	radio              : RadioGroupController,
	checkboxGroup      : CheckboxGroupController,
	textArea           : TextAreaController,
	uploader           : UploadController,
	text               : InputController,
	checkbox           : CheckboxController,
	'creatable-select' : CreatableMultiSelectController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

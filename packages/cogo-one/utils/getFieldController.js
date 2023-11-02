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
	MobileNumberController,
	ChipsController,
	MultiselectController,
	SingleDateRangeController,
	TimepickerController,
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
	checkbox           : CheckboxController,
	'creatable-select' : CreatableMultiSelectController,
	'multi-select'     : MultiselectController,
	mobile_number      : MobileNumberController,
	chips              : ChipsController,
	singleDateRange    : SingleDateRangeController,
	timePicker         : TimepickerController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

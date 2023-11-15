import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
	MobileNumberController,
	DatepickerController,
	UploadController,
	CreatableMultiSelectController,
	CreatableSelectController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	'async-select'         : AsyncSelectController,
	select                 : SelectController,
	input                  : InputController,
	'date-picker'          : DateRangePickerController,
	chips                  : ChipsController,
	radioGroup             : RadioGroupController,
	textarea               : TextAreaController,
	'multi-select'         : MultiselectController,
	number                 : InputController,
	text                   : InputController,
	'mobile-number-select' : MobileNumberController,
	SingleDateRange        : DatepickerController,
	'date-select'          : DatepickerController,
	fileUpload             : UploadController,
	email                  : InputController,
	asyncSelect            : AsyncSelectController,
	password               : InputController,
	createmultiselect      : CreatableMultiSelectController,
	createselect           : CreatableSelectController,

};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || null;
}

export default getElementController;
